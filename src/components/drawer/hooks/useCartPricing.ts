import { useMemo } from "react";

import type { CartItem, CourseCartItem } from "@/store/cartStore";

import { calculateDiscountPercent } from "../utils/cartDrawerHelpers";

export const useCartPricing = (
  cartItems: CartItem[],
  checkedItems: Record<string, boolean>,
  courses: CartItem[],
  couponDiscount: number,
) => {
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      if (checkedItems[item.id]) {
        return total + (item.price || 0);
      }
      return total;
    }, 0);
  }, [cartItems, checkedItems]);

  const selectedCourseCount = useMemo(() => {
    return courses.filter((item) => checkedItems[item.id]).length;
  }, [courses, checkedItems]);

  const discountPercent = useMemo(() => {
    return calculateDiscountPercent(selectedCourseCount);
  }, [selectedCourseCount]);

  const courseTotalPrice = useMemo(() => {
    return courses.reduce((total, item) => {
      if (checkedItems[item.id]) {
        return total + (item.price || 0);
      }
      return total;
    }, 0);
  }, [courses, checkedItems]);

  const discountAmount = useMemo(
    () => Math.floor((courseTotalPrice * discountPercent) / 100),
    [courseTotalPrice, discountPercent],
  );

  const finalPrice = useMemo(
    () => Math.max(0, totalPrice - discountAmount - couponDiscount),
    [totalPrice, discountAmount, couponDiscount],
  );

  return {
    totalPrice,
    discountPercent,
    discountAmount,
    finalPrice,
    selectedCourseCount,
    courseTotalPrice,
  };
};

export const useCourseDateValidation = (
  courses: CartItem[],
  checkedItems: Record<string, boolean>,
) => {
  const hasInvalidCourseDate = useMemo(() => {
    return courses.some((course) => {
      const courseItem = course as CourseCartItem;
      return (
        checkedItems[course.id] &&
        (!courseItem.date || courseItem.date === "Choose a start date")
      );
    });
  }, [courses, checkedItems]);

  return { hasInvalidCourseDate };
};
