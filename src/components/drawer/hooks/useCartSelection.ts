import { useState } from "react";

export const useCartSelection = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckChange = (itemId: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: checked,
    }));
  };

  const clearSelection = () => {
    setCheckedItems({});
  };

  const getSelectedCount = () => {
    return Object.values(checkedItems).filter(Boolean).length;
  };

  return {
    checkedItems,
    handleCheckChange,
    clearSelection,
    getSelectedCount,
  };
};
