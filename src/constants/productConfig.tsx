import { BookOpenIcon } from "@phosphor-icons/react/dist/csr/BookOpen";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/csr/GraduationCap";
import { RocketIcon } from "@phosphor-icons/react/dist/csr/Rocket";
import { RocketLaunchIcon } from "@phosphor-icons/react/dist/csr/RocketLaunch";
import React from "react";

import { ItemType, type ProductType } from "@/enum/itemType";

export interface ProductConfigItem {
  type: ProductType;
  label: string;
  labelThai: string;
  icon: React.ReactNode;
  iconLarge: React.ReactNode;
  iconBgClass: string;
  iconColor: string;
  badgeTextClass: string;
}

export const PRODUCT_CONFIG: Record<ProductType, ProductConfigItem> = {
  course: {
    type: "course",
    label: "Course",
    labelThai: "คอร์สเรียน",
    icon: (
      <GraduationCapIcon className="h-4 text-[var(--product-course-icon-color)] w-4" />
    ),
    iconLarge: (
      <GraduationCapIcon
        size={32}
        weight="duotone"
        className="text-badge-course-text"
      />
    ),
    iconBgClass: "bg-[var(--product-course-icon-bg)]",
    iconColor: "var(--product-course-icon-color)",
    badgeTextClass: "text-badge-course-text",
  },
  ebook: {
    type: "ebook",
    label: "E-book",
    labelThai: "อีบุ๊ค",
    icon: (
      <BookOpenIcon className="h-4 text-[var(--product-ebook-icon-color)] w-4" />
    ),
    iconLarge: (
      <BookOpenIcon
        size={32}
        weight="duotone"
        className="text-badge-ebook-text"
      />
    ),
    iconBgClass: "bg-[var(--product-ebook-icon-bg)]",
    iconColor: "var(--product-ebook-icon-color)",
    badgeTextClass: "text-badge-ebook-text",
  },
  bootcamp: {
    type: "bootcamp",
    label: "Bootcamp",
    labelThai: "บูทแคมป์",
    icon: (
      <RocketLaunchIcon className="h-4 text-[var(--product-bootcamp-icon-color)] w-4" />
    ),
    iconLarge: (
      <RocketIcon
        size={32}
        weight="duotone"
        className="text-badge-bootcamp-text"
      />
    ),
    iconBgClass: "bg-[var(--product-bootcamp-icon-bg)]",
    iconColor: "var(--product-bootcamp-icon-color)",
    badgeTextClass: "text-badge-bootcamp-text",
  },
};

export const getProductConfig = (itemType: ItemType): ProductConfigItem => {
  return PRODUCT_CONFIG[itemType as ProductType];
};

export const PRODUCT_TYPE_ORDER: ProductType[] = [
  "course",
  "ebook",
  "bootcamp",
];

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("th-TH")} บาท`;
};
