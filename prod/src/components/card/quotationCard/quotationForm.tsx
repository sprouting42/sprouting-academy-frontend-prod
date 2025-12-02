"use client";

import { useForm } from "@tanstack/react-form";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { CheckboxInput } from "@/components/common/input";
import type { CourseData } from "@/data/courses";
import {
  type QuotationFormData,
  quotationSchema,
} from "@/schemas/quotation.schema";
import { cn } from "@/utils/cn";

import { QuotationFields } from "./quotationField.tsx";

interface CourseOptionItemProps {
  course: CourseData;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CourseOptionItem = ({
  course,
  checked,
  onChange,
}: CourseOptionItemProps) => {
  return (
    <div className="flex flex-row gap-4 items-start justify-between p-0 w-full">
      <CheckboxInput
        id={`course-${course.id}`}
        name="courses"
        value={course.id}
        checked={checked}
        onChange={onChange}
        variant="primary"
        size="sm"
        className="flex items-center"
        checkboxClassName="flex-shrink-0 border-foreground rounded-sm"
        content={
          <div className="flex flex-col gap-0.5">
            <span className="font-medium leading-[30px] lg:text-base text-sm">
              {course.title}
            </span>
          </div>
        }
      />
    </div>
  );
};

interface QuotationFormProps {
  onSubmit?: (data: QuotationFormData) => void | Promise<void>;
  className?: string;
  courses?: CourseData[];
  isLoadingCourses?: boolean;
}

export const QuotationForm = ({
  onSubmit,
  className,
  courses = [],
  isLoadingCourses = false,
}: QuotationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const courseOptions = useMemo<CourseData[]>(() => courses, [courses]);

  const createCourseChangeHandler = useCallback(
    (
      courseId: string,
      field: {
        state: { value: string[] };
        handleChange: (value: string[]) => void;
        handleBlur: () => void;
      },
    ) => {
      return (isChecked: boolean) => {
        const currentCourses = Array.isArray(field.state.value)
          ? field.state.value
          : [];
        const newCourses = isChecked
          ? [...currentCourses, courseId]
          : currentCourses.filter((c) => c !== courseId);
        field.handleChange(newCourses);
        field.handleBlur();
      };
    },
    [],
  );

  const form = useForm({
    defaultValues: {
      companyName: "",
      contactPersonName: "",
      phone: "",
      email: "",
      courses: [] as string[],
      numberOfStudents: "",
      budget: "",
      additionalDetails: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        await onSubmit?.(value as QuotationFormData);
      } finally {
        setIsSubmitting(false);
      }
    },
    onSubmitInvalid: ({ value }) => {
      const result = quotationSchema.safeParse(value);
      if (!result.success) {
        const firstErrorField = result.error.issues[0]?.path[0] as string;

        if (firstErrorField && fieldRefs.current[firstErrorField]) {
          setTimeout(() => {
            fieldRefs.current[firstErrorField]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            const input = fieldRefs.current[firstErrorField]?.querySelector(
              "input, textarea, input[type='checkbox']",
            );
            setTimeout(() => {
              (input as HTMLInputElement)?.focus();
            }, 400);
          }, 100);
        }
      }
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <Card
      variant="gradientDarkToLight"
      className={cn("w-full max-w-[1216px]", className)}
      contentClassName={cn(
        "box-border flex flex-col items-start p-4 gap-6",
        "bg-linear-to-b from-background-light to-background",
      )}
      cardContent={
        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="flex flex-col gap-6 items-start w-full"
        >
          <h2 className="font-medium font-prompt h-[33px] leading-[33px] lg:text-[22px] text-foreground text-lg w-full">
            ฟอร์มขอใบเสนอราคา
          </h2>

          <div className="flex flex-1 flex-col gap-4 items-start p-0 w-full">
            <QuotationFields
              form={form}
              fieldRefs={fieldRefs}
              courseOptions={courseOptions}
              isLoadingCourses={isLoadingCourses}
              createCourseChangeHandler={createCourseChangeHandler}
              CourseOptionItem={CourseOptionItem}
            />
          </div>

          <Button
            type="submit"
            text="สร้างใบเสนอราคา"
            variant="primary"
            size="sm"
            shape="rounded"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </form>
      }
    />
  );
};
