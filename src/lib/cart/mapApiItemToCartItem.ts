import { CartItemDetail } from "@/apis/cart";
import { CartItem } from "@/store/cartStore";

export const mapApiItemToCartItem = (item: CartItemDetail): CartItem => ({
  id: item.id,
  courseId: item.courseId,
  courseName: item.courseTitle,
  price: item.price,
  date: item.courseDate
    ? new Date(item.courseDate).toLocaleDateString("th-TH")
    : "",
  totalTime: item.totalTimesCourse?.toString() || "",
  classType: item.classType || "",
});
