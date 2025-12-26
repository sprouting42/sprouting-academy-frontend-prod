import { ItemType } from "@/enum/itemType";

export function mapItemTypeToProductType(
  itemType: ItemType,
): "course" | "ebook" | "bootcamp" {
  const productTypeMap: Record<ItemType, "course" | "ebook" | "bootcamp"> = {
    [ItemType.COURSE]: "course",
    [ItemType.EBOOK]: "ebook",
    [ItemType.BOOTCAMP]: "bootcamp",
  };

  return productTypeMap[itemType];
}

export function mapProductTypeToItemType(productType: string): ItemType {
  const productTypeToItemType: Record<string, ItemType> = {
    COURSE: ItemType.COURSE,
    EBOOK: ItemType.EBOOK,
    BOOTCAMP: ItemType.BOOTCAMP,
    course: ItemType.COURSE,
    ebook: ItemType.EBOOK,
    bootcamp: ItemType.BOOTCAMP,
  };

  return productTypeToItemType[productType] || ItemType.COURSE;
}
