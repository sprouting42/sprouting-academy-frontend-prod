"use client";

import { useForm } from "@tanstack/react-form";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { HiCash } from "react-icons/hi";
import {
  HiAcademicCap,
  HiEnvelope,
  HiPhone,
  HiUser,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";
import { z } from "zod";

import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { CheckboxInput, Input, Textarea } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { courses } from "@/data/courses";
import {
  type QuotationFormData,
  quotationSchema,
} from "@/schemas/quotation.schema";
import { cn } from "@/utils/cn";

interface ErrorMessageProps {
  message?: string;
  id?: string;
}

const ErrorMessage = ({ message, id }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <span id={id} className="font-prompt text-red-500 text-sm" role="alert">
      {message}
    </span>
  );
};

const formatDateBadgeText = (dateBadgeText: string): string => {
  return dateBadgeText.replace("เรียนวันที่ ", "");
};

type CourseOption = {
  id: string;
  title: string;
  dateBadgeText: string;
  formattedDateBadgeText: string;
};

interface CourseOptionItemProps {
  course: CourseOption;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CourseOptionItem = ({
  course,
  checked,
  onChange,
}: CourseOptionItemProps) => (
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

interface QuotationFormProps {
  onSubmit?: (data: QuotationFormData) => void | Promise<void>;
  className?: string;
}

const createFieldValidator = <T extends z.ZodType>(schema: T) => {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };
};

const FIELD_WRAPPER_CLASS = "flex flex-col gap-2 items-start p-0 w-full";
const FIELD_WRAPPER_FLEX_CLASS = "flex flex-1 flex-col gap-2 items-start p-0";
const ICON_PROPS = { size: 24, color: "var(--foreground)" as const };
const INPUT_COMMON_PROPS = {
  variant: "primary" as const,
  className: "w-full",
};

export const QuotationForm = ({ onSubmit, className }: QuotationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const courseOptions = useMemo<CourseOption[]>(
    () =>
      courses.map((course) => ({
        id: course.id,
        title: course.title,
        dateBadgeText: course.dateBadgeText,
        formattedDateBadgeText: course.dateBadgeText
          ? formatDateBadgeText(course.dateBadgeText)
          : "",
      })),
    [],
  );

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
            <form.Field
              name="companyName"
              validators={{
                onChange: createFieldValidator(
                  quotationSchema.shape.companyName,
                ),
                onBlur: createFieldValidator(quotationSchema.shape.companyName),
              }}
            >
              {(field) => (
                <div
                  ref={(el) => {
                    fieldRefs.current.companyName = el;
                  }}
                  className={FIELD_WRAPPER_CLASS}
                >
                  <Label
                    text="ชื่อบริษัท/องค์กร"
                    icon={<HiUserGroup {...ICON_PROPS} />}
                    required
                    htmlFor="companyName"
                  />
                  <Input
                    id="companyName"
                    name="companyName"
                    autoComplete="organization"
                    placeholder="ชื่อบริษัทของคุณ"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    {...INPUT_COMMON_PROPS}
                    required
                  />
                  <ErrorMessage
                    message={field.state.meta.errors[0]}
                    id="companyName-error"
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="contactPersonName"
              validators={{
                onChange: createFieldValidator(
                  quotationSchema.shape.contactPersonName,
                ),
                onBlur: createFieldValidator(
                  quotationSchema.shape.contactPersonName,
                ),
              }}
            >
              {(field) => (
                <div
                  ref={(el) => {
                    fieldRefs.current.contactPersonName = el;
                  }}
                  className={FIELD_WRAPPER_CLASS}
                >
                  <Label
                    text="ชื่อผู้ติดต่อ"
                    icon={<HiUser {...ICON_PROPS} />}
                    required
                    htmlFor="contactPersonName"
                  />
                  <Input
                    id="contactPersonName"
                    name="contactPersonName"
                    autoComplete="name"
                    placeholder="ชื่อของคุณ"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    {...INPUT_COMMON_PROPS}
                    required
                  />
                  <ErrorMessage
                    message={field.state.meta.errors[0]}
                    id="contactPersonName-error"
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{
                onChange: createFieldValidator(quotationSchema.shape.phone),
                onBlur: createFieldValidator(quotationSchema.shape.phone),
              }}
            >
              {(field) => (
                <div
                  ref={(el) => {
                    fieldRefs.current.phone = el;
                  }}
                  className={FIELD_WRAPPER_CLASS}
                >
                  <Label
                    text="เบอร์โทรศัพท์"
                    icon={<HiPhone {...ICON_PROPS} />}
                    required
                    htmlFor="phone"
                  />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="08x-xxx-xxxx"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    {...INPUT_COMMON_PROPS}
                    required
                  />
                  <ErrorMessage
                    message={field.state.meta.errors[0]}
                    id="phone-error"
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: createFieldValidator(quotationSchema.shape.email),
                onBlur: createFieldValidator(quotationSchema.shape.email),
              }}
            >
              {(field) => (
                <div
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  className={FIELD_WRAPPER_CLASS}
                >
                  <Label
                    text="อีเมล"
                    icon={<HiEnvelope {...ICON_PROPS} />}
                    required
                    htmlFor="email"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    {...INPUT_COMMON_PROPS}
                    required
                  />
                  <ErrorMessage
                    message={field.state.meta.errors[0]}
                    id="email-error"
                  />
                </div>
              )}
            </form.Field>

            <form.Field
              name="courses"
              validators={{
                onChange: createFieldValidator(quotationSchema.shape.courses),
                onBlur: createFieldValidator(quotationSchema.shape.courses),
              }}
            >
              {(field) => (
                <div
                  ref={(el) => {
                    fieldRefs.current.courses = el;
                  }}
                  className="flex flex-col gap-4 items-start p-0 w-full"
                >
                  <div className="flex font-prompt gap-2 items-center justify-start lg:text-[18px] text-base">
                    <span className="flex h-6 items-center w-6">
                      <HiAcademicCap {...ICON_PROPS} />
                    </span>
                    <span className="flex gap-1 items-center">
                      เลือกคอร์สที่สนใจ
                      <span className="text-foreground">*</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 items-start p-0 px-4 w-full">
                    {courseOptions.map((course) => {
                      const checked =
                        Array.isArray(field.state.value) &&
                        field.state.value.includes(course.id);
                      const handleChange = createCourseChangeHandler(
                        course.id,
                        field,
                      );
                      return (
                        <CourseOptionItem
                          key={course.id}
                          course={course}
                          checked={checked}
                          onChange={handleChange}
                        />
                      );
                    })}
                  </div>
                  <ErrorMessage
                    message={field.state.meta.errors[0]}
                    id="courses-error"
                  />
                </div>
              )}
            </form.Field>

            <div className="flex flex-col gap-6 items-start lg:flex-row p-0 w-full">
              <form.Field
                name="numberOfStudents"
                validators={{
                  onChange: createFieldValidator(
                    quotationSchema.shape.numberOfStudents,
                  ),
                  onBlur: createFieldValidator(
                    quotationSchema.shape.numberOfStudents,
                  ),
                }}
              >
                {(field) => (
                  <div
                    ref={(el) => {
                      fieldRefs.current.numberOfStudents = el;
                    }}
                    className={FIELD_WRAPPER_FLEX_CLASS}
                  >
                    <Label
                      text="จำนวนผู้เรียนโดยประมาณ"
                      icon={<HiUsers {...ICON_PROPS} />}
                      required
                      htmlFor="numberOfStudents"
                    />
                    <Input
                      id="numberOfStudents"
                      name="numberOfStudents"
                      autoComplete="off"
                      placeholder="99 คน"
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      {...INPUT_COMMON_PROPS}
                      required
                    />
                    <ErrorMessage
                      message={field.state.meta.errors[0]}
                      id="numberOfStudents-error"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="budget">
                {(field) => (
                  <div className={FIELD_WRAPPER_FLEX_CLASS}>
                    <Label
                      text="งบประมาณโดยประมาณ (Optional)"
                      icon={<HiCash {...ICON_PROPS} />}
                      htmlFor="budget"
                    />
                    <Input
                      id="budget"
                      name="budget"
                      autoComplete="off"
                      placeholder="xx,xxx บาท"
                      value={field.state.value || ""}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      {...INPUT_COMMON_PROPS}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="additionalDetails">
              {(field) => (
                <div className={FIELD_WRAPPER_CLASS}>
                  <Label
                    text="รายละเอียดเพิ่มเติม"
                    icon={<BiSolidDetail {...ICON_PROPS} />}
                    htmlFor="additionalDetails"
                  />
                  <Textarea
                    id="additionalDetails"
                    name="additionalDetails"
                    autoComplete="off"
                    placeholder=""
                    value={field.state.value || ""}
                    onChange={(value) => field.handleChange(value)}
                    onBlur={field.handleBlur}
                    variant="primary"
                    className="w-full"
                    rows={3}
                  />
                </div>
              )}
            </form.Field>
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
