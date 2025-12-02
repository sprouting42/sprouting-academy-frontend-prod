import type { CollectionSlug, Validate } from "payload";

type IdValue = string | number;

interface BaseDoc {
  id?: IdValue;
  [key: string]: unknown;
}

/** Extract id from allowed relationship formats */
const extractId = (val: unknown): IdValue | null => {
  if (typeof val === "string" || typeof val === "number") return val;
  if (val && typeof val === "object") {
    if ("id" in val) return (val as { id: IdValue }).id;
    if ("value" in val) return (val as { value: IdValue }).value;
  }
  return null;
};

export const validateUniqueRelationship = <Doc extends BaseDoc = BaseDoc>({
  collection,
  field,
  displayCollection,
  displayField,
  errorMessage,
  limit = 100,
  displayLimit = 20,
}: {
  collection: CollectionSlug;
  field: string;
  displayCollection: CollectionSlug;
  displayField: string;
  errorMessage: (names: string) => string;
  limit?: number;
  displayLimit?: number;
}): Validate => {
  return async (value, { req, data }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return true;
    }

    const docId = (data as Doc)?.id;

    const selectedIds: IdValue[] = (Array.isArray(value) ? value : [value])
      .map(extractId)
      .filter((id): id is IdValue => id !== null);

    const existing = await req.payload.find({
      collection,
      where: {
        [field]: { in: selectedIds },
        ...(docId && { id: { not_equals: docId } }),
      },
      limit,
    });

    if (existing.docs.length === 0) return true;

    const conflictingIds = new Set<IdValue>();

    existing.docs.forEach((doc) => {
      const docData = doc as unknown as BaseDoc;
      const rel = docData[field];
      const relValues = Array.isArray(rel) ? rel : [rel];

      const iterableValues = relValues as unknown[];

      iterableValues.forEach((v) => {
        const extracted = extractId(v);
        if (extracted !== null && selectedIds.includes(extracted)) {
          conflictingIds.add(extracted);
        }
      });
    });

    if (conflictingIds.size === 0) return true;

    const usedItems = await req.payload.find({
      collection: displayCollection,
      where: { id: { in: Array.from(conflictingIds) } },
      limit: displayLimit,
    });

    const names = usedItems.docs
      .map((doc) => {
        const docData = doc as unknown as BaseDoc;
        const fieldValue = docData[displayField];
        return String(fieldValue ?? "Unknown");
      })
      .join(", ");

    return errorMessage(names);
  };
};
