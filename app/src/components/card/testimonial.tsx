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
    <div className="bg-linear-to-b border border-foreground/25 flex flex-col from-background-light gap-4 h-[300px] p-4 rounded-xl to-background w-[384px]">
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
          () => (
            <FaStar
              key={testimonialRating}
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
