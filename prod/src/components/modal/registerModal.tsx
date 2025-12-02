"use client";

import { useCallback, useState } from "react";

import { cn } from "@/utils/cn";

import { Button } from "../common/button";
import { CheckboxInput } from "../common/input";
import { Modal } from "../common/modal";

interface CourseOption {
  id: string;
  label: string;
  remainingSeats: number;
}

interface RegisterModalProps {
  open?: boolean;
  onClose?: () => void;
  courseOptions?: CourseOption[];
  originalPrice?: number;
  earlyBirdPrice?: number;
  onRegister?: (selectedCourseId: string) => void;
}

export const RegisterModal = ({
  open = false,
  onClose,
  courseOptions = [
    {
      id: "course-1",
      label: "รุ่นที่ 1: 5 - 16 มกราคม",
      remainingSeats: 8,
    },
    {
      id: "course-10",
      label: "รุ่นที่ 10: 5 - 16 มีนาคม",
      remainingSeats: 10,
    },
  ],
  originalPrice = 4900,
  earlyBirdPrice = 3900,
  onRegister,
}: RegisterModalProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = useCallback(() => {
    if (selectedCourse && onRegister && !isSubmitting) {
      setIsSubmitting(true);
      onRegister(selectedCourse);
    }
  }, [selectedCourse, onRegister, isSubmitting]);

  const handleCourseSelect = useCallback((courseId: string) => {
    setSelectedCourse(courseId);
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="เลือกรุ่นเรียนและจองทะเบียน"
      size="xl"
      position="center"
      closeOnOverlayClick={true}
      description={
        <div className={cn("flex flex-col gap-4 w-full")}>
          <div className={cn("flex flex-col gap-3")}>
            {courseOptions.map((course) => (
              <div key={course.id} className={cn("flex w-full")}>
                <CheckboxInput
                  checked={selectedCourse === course.id}
                  onChange={() => handleCourseSelect(course.id)}
                  content={course.label}
                  variant="primary"
                  size="md"
                  className={cn("flex-1")}
                  checkboxClassName="rounded-full"
                />
                <span
                  className={cn(
                    "text-foreground font-prompt whitespace-nowrap ml-4",
                  )}
                >
                  สถานะ:{" "}
                  <span className={cn("font-medium")}>
                    เหลือ {course.remainingSeats} ที่นั่ง
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className={cn("w-full h-px bg-foreground/10 my-2")} />

          <div className={cn("flex flex-col items-end gap-4")}>
            <div
              className={cn(
                "text-foreground/50 line-through font-prompt text-base lg:text-lg",
              )}
            >
              ราคาปกติ {originalPrice?.toLocaleString()} บาท
            </div>
            <div
              className={cn(
                "text-secondary font-prompt text-xl lg:text-2xl font-medium",
              )}
            >
              ราคาพิเศษเฉพาะเดือนนี้! Early Bird จองเดือนนี้{" "}
              <span className={cn("text-foreground")}>
                {earlyBirdPrice?.toLocaleString()}
              </span>
            </div>
            <div
              className={cn(
                "text-foreground/70 font-prompt text-sm lg:text-base",
              )}
            >
              หมายเหตุรับจำนวนจำกัดเพียง 15 ท่านเท่านั้น
            </div>
          </div>
        </div>
      }
      buttons={
        <div className="flex justify-end max-w-max ml-auto">
          <Button
            className="rounded-full w-full"
            text="ดำเนินการต่อเพื่อชำระเงิน"
            variant="primaryGradientBorder"
            size="md"
            disabled={!selectedCourse || isSubmitting}
            onClick={handleRegister}
          />
        </div>
      }
    />
  );
};
