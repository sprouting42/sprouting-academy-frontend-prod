import type { CourseData } from "@/data/courses";
import { ItemType } from "@/enum/itemType";

import { useAddItemToCart } from "./useCart";

export function useAddCourseToCart() {
  const { mutate: addItemToCart, isPending } = useAddItemToCart();

  const addCourseToCart = (course: CourseData) => {
    const priceNum =
      parseFloat((course.price || "0").replace(/[^0-9.]/g, "")) || 0;

    const coverImageUrl =
      typeof course.coverImage === "string"
        ? course.coverImage
        : course.coverImage?.url || undefined;

    addItemToCart({
      itemType: ItemType.COURSE,
      courseId: course.id,
      courseName: course.title,
      price: priceNum,
      date: "",
      totalTime: course.totalTime || "",
      classType: course.classType || "",
      imageUrl: coverImageUrl,
      availableDates: course.dateOptions || [],
    });
  };

  return { addCourseToCart, isPending };
}
