import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

interface TestimonialProps {
  testimonialText: string;
  testimonialName: string;
  testimonialPosition: string;
  testimonialImage: string;
  testimonialRating: number;
}

export const Testimonial = ({
  testimonialText,
  testimonialName,
  testimonialPosition,
  testimonialImage,
  testimonialRating,
}: TestimonialProps) => {
  return (
    <div className="[html[data-theme='dark']_&]:bg-linear-to-b [html[data-theme='dark']_&]:border-foreground/25 [html[data-theme='dark']_&]:from-background-light [html[data-theme='dark']_&]:shadow-none [html[data-theme='dark']_&]:to-background [html[data-theme='light']_&]:bg-white [html[data-theme='light']_&]:border-foreground/25 border flex flex-col gap-4 h-75 p-4 rounded-xl shadow-[0_4px_4px_0_rgba(0,0,0,0.08)] w-96">
      <div className="flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-3 items-center">
          <div className="bg-secondary/10 border-2 border-secondary flex h-12 items-center justify-center rounded-full w-12">
            <Image
              src={testimonialImage}
              alt="testimonial"
              width={40}
              height={40}
              className="h-full object-cover rounded-full w-full"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-foreground">
              {testimonialName}
            </span>
            <span className="font-normal text-foreground/50">
              {testimonialPosition}
            </span>
          </div>
        </div>
        <FaQuoteRight size={48} className="text-secondary" />
      </div>
      <div className="flex flex-row gap-1 items-center">
        {Array.from({ length: Math.max(0, Math.round(testimonialRating)) }).map(
          (_, index) => (
            <FaStar
              key={`testimonial-rating-${index}`}
              size={20}
              className="text-secondary"
            />
          ),
        )}
      </div>
      <div className="font-prompt text-foreground w-full">
        {testimonialText}
      </div>
    </div>
  );
};
