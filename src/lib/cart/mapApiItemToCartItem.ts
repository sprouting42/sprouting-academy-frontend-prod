import { CartItemDetail } from "@/apis/cart";
import { ItemType } from "@/enum/itemType";
import {
  BootcampCartItem,
  CartItem,
  CourseCartItem,
  EbookCartItem,
} from "@/store/cartStore";
import { mapProductTypeToItemType } from "@/utils/itemTypeMapper";

export const mapApiItemToCartItem = (item: CartItemDetail): CartItem => {
  const itemType = mapProductTypeToItemType(item.productType);

  switch (itemType) {
    case ItemType.EBOOK:
      return {
        id: item.id,
        itemType: ItemType.EBOOK,
        itemId: item.productId,
        name: item.title,
        price: item.price,
        pageCount: item.pageCount,
      } as EbookCartItem;

    case ItemType.BOOTCAMP:
      return {
        id: item.id,
        itemType: ItemType.BOOTCAMP,
        itemId: item.productId,
        name: item.title,
        price: item.price,
        startDate: item.startDate || "",
        duration: item.duration || "",
        schedule: item.schedule || undefined,
        features: item.features || undefined,
      } as BootcampCartItem;

    case ItemType.COURSE:
    default:
      return {
        id: item.id,
        itemType: ItemType.COURSE,
        itemId: item.productId,
        name: item.title,
        price: item.price,
        date: item.courseDate
          ? new Date(item.courseDate).toLocaleDateString("th-TH")
          : "",
        totalTime: item.totalTimesCourse?.toString() || "",
        classType: item.classType || "",
        availableDates: item.availableDates || undefined,
      } as CourseCartItem;
  }
};
