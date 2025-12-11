"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

import { ContactFormData, submitContactForm } from "@/apis/contact";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Input, Textarea } from "@/components/common/input";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      setName("");
      setCompany("");
      setEmail("");
      setMessage("");
      toast.success("ส่งข้อความสำเร็จ!");
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: ContactFormData = {
      name,
      company,
      email,
      message,
    };

    mutation.mutate(formData);
  };

  return (
    <div className="mb-16">
      <Card
        variant="gradientDarkToLight"
        cardContent={
          <div className="bg-gradient-to-b from-base-200 p-6 rounded-2xl to-background">
            <h1 className="font-semibold mb-6 text-[1.375rem] text-center text-secondary">
              ติดต่อเรา
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="ชื่อของคุณ*"
                value={name}
                onChange={setName}
                required
                variant="secondary"
                disabled={mutation.isPending}
              />
              <Input
                placeholder="ชื่อบริษัท"
                value={company}
                onChange={setCompany}
                variant="secondary"
                disabled={mutation.isPending}
              />
              <Input
                type="email"
                placeholder="อีเมลของคุณ*"
                value={email}
                onChange={setEmail}
                required
                variant="secondary"
                disabled={mutation.isPending}
              />
              <Textarea
                placeholder="ข้อความ"
                value={message}
                onChange={setMessage}
                variant="secondary"
                rows={6}
                disabled={mutation.isPending}
              />
              <Button
                type="submit"
                variant="primaryGradientBorder"
                shape="rounded"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
              </Button>

              {mutation.isError && (
                <p className="text-center text-red-500 text-sm">
                  เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
                </p>
              )}
              {mutation.isSuccess && (
                <p className="text-center text-green-500 text-sm">
                  ส่งข้อความสำเร็จแล้ว!
                </p>
              )}
            </form>
          </div>
        }
      />
    </div>
  );
}
