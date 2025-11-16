import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { Button } from "../common";

export const Hero = () => {
  return (
    <section className="">
      <div className="flex flex-col gap-8 items-center px-99 py-56">
        <div className="flex flex-col gap-8 items-center py-2">
          <h1 className="bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary py-2 text-7xl text-end text-transparent to-primary via-secondary">
            เรียนรู้ AI Automation
          </h1>
          <h1 className="bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary py-2 text-7xl text-end text-transparent to-primary via-secondary">
            ไปกับกูรูของเรา
          </h1>
          <p className="font-prompt text-2xl">
            ลดเวลาการทำงานเพื่อนำไปพัฒนาตัวเองและองค์กร
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <Link href="/courses">
              <Button
                text="ดูคอร์สทั้งหมด "
                icon={<FaArrowRight />}
                shape="rounded"
              />
            </Link>
          </div>
          <div>
            <Button
              text="สอบถาม/ขอใบเสนอราคาองค์กร"
              shape="rounded"
              variant="secondaryGradientBorder"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
