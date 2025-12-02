import { HighlightMarkdownText } from "@/utils/highlightText";

interface BulletListItem {
  id: string;
  text: string;
}

interface BulletListProps {
  items: BulletListItem[] | string[];
  className?: string;
}

export const BulletList = ({ items, className }: BulletListProps) => {
  const normalizeItems = (
    items: BulletListItem[] | string[],
  ): BulletListItem[] => {
    return items.map((item) => {
      if (typeof item === "string") {
        return { id: `bullet-${item}`, text: item };
      }
      return item;
    });
  };

  const normalizedItems = normalizeItems(items);

  return (
    <ul className={`flex flex-col gap-2 items-start w-full ${className || ""}`}>
      {normalizedItems.map((item) => (
        <li
          key={item.id}
          className="flex font-prompt gap-2 items-start text-base w-full"
        >
          <span className="mt-0.5">•</span>
          <span className="flex-1">
            <HighlightMarkdownText text={item.text} />
          </span>
        </li>
      ))}
    </ul>
  );
};
