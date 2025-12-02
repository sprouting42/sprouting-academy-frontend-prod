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

import { Input, Textarea } from "@/components/common/input";
import { Label } from "@/components/common/label";
import type { CourseData } from "@/data/courses";
import { quotationSchema } from "@/schemas/quotation.schema";

interface ErrorMessageProps {
  message?: string;
  id?: string;
}

export const ErrorMessage = ({ message, id }: ErrorMessageProps) => {
  if (!message) return null;
  return (
    <span id={id} className="font-prompt text-red-500 text-sm" role="alert">
      {message}
    </span>
  );
};

export const createFieldValidator = <T extends z.ZodType>(schema: T) => {
  return ({ value }: { value: unknown }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };
};

export const FIELD_WRAPPER_CLASS = "flex flex-col gap-2 items-start p-0 w-full";
export const FIELD_WRAPPER_FLEX_CLASS =
  "flex flex-1 flex-col gap-2 items-start p-0";
export const ICON_PROPS = { size: 24, color: "var(--foreground)" as const };
export const INPUT_COMMON_PROPS = {
  variant: "primary" as const,
  className: "w-full",
};

interface FieldState<T> {
  value: T;
  meta: {
    errors: (string | undefined)[];
  };
}

interface FormField<T> {
  state: FieldState<T>;
  handleChange: (value: T) => void;
  handleBlur: () => void;
}

interface QuotationFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  fieldRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  courseOptions: CourseData[];
  isLoadingCourses: boolean;
  createCourseChangeHandler: (
    courseId: string,
    field: FormField<string[]>,
  ) => (isChecked: boolean) => void;
  CourseOptionItem: React.ComponentType<{
    course: CourseData;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }>;
}

export const QuotationFields = ({
  form,
  fieldRefs,
  courseOptions,
  isLoadingCourses,
  createCourseChangeHandler,
  CourseOptionItem,
}: QuotationFieldsProps) => {
  return (
    <>
      <form.Field
        name="companyName"
        validators={{
          onChange: createFieldValidator(quotationSchema.shape.companyName),
          onBlur: createFieldValidator(quotationSchema.shape.companyName),
        }}
      >
        {(field: FormField<string>) => (
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
          onBlur: createFieldValidator(quotationSchema.shape.contactPersonName),
        }}
      >
        {(field: FormField<string>) => (
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
        {(field: FormField<string>) => (
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
        {(field: FormField<string>) => (
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
        {(field: FormField<string[]>) => (
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
            {isLoadingCourses ? (
              <div className="flex items-center justify-center py-4 w-full">
                <span className="font-prompt text-foreground/60">
                  กำลังโหลดคอร์ส...
                </span>
              </div>
            ) : (
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
            )}
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
          {(field: FormField<string>) => (
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
          {(field: FormField<string | undefined>) => (
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
        {(field: FormField<string | undefined>) => (
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
    </>
  );
};
