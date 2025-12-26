"use client";

import { BriefcaseIcon } from "@phosphor-icons/react/dist/csr/Briefcase";
import { GearIcon } from "@phosphor-icons/react/dist/csr/Gear";
import { HammerIcon } from "@phosphor-icons/react/dist/csr/Hammer";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { CourseCard } from "@/components/card/courseCard";
import { WhyUsCard } from "@/components/card/whyUsCard";
import { Button } from "@/components/common/button";
import { Popup } from "@/components/common/popup";
import { MentorFormModal } from "@/components/modal";
import { whyUsData } from "@/data/bootcamp-whyuscard";
import type { BootcampCardData } from "@/data/bootcampCard";
import type { PopupImage } from "@/data/popup";
import { useModal } from "@/hooks/useModal";

interface BootcampsContentProps {
  bootcampsData: BootcampCardData[];
  popupImages: PopupImage[];
}

export function BootcampsContent({
  bootcampsData,
  popupImages,
}: BootcampsContentProps) {
  const router = useRouter();
  const { openModal, openModalButton, closeModalButton } = useModal();
  const heroRef = useRef(null);
  const whyUsRef = useRef(null);
  const coursesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const whyUsInView = useInView(whyUsRef, { once: true });
  const coursesInView = useInView(coursesRef, { once: true });

  const sortOrder = ["basic-html", "java-spring-boot", "csharp-net-core"];

  const sortedBootcamps = [...bootcampsData].sort((a, b) => {
    const slugA = a.link.replace("/bootcamps/", "");
    const slugB = b.link.replace("/bootcamps/", "");

    const indexA = sortOrder.indexOf(slugA);
    const indexB = sortOrder.indexOf(slugB);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  const getIcon = (iconType: string) => {
    const iconProps = {
      size: 32,
      weight: "regular" as const,
      color: "url(#icon-gradient)",
    };

    switch (iconType) {
      case "hammer":
        return <HammerIcon {...iconProps} />;
      case "briefcase":
        return <BriefcaseIcon {...iconProps} />;
      case "magnifyingGlass":
        return <MagnifyingGlassIcon {...iconProps} />;
      case "gear":
        return <GearIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Popup images={popupImages} storageKey="bootcamp-popup-shown" />
      <motion.div className="font-prompt">
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient
              id="icon-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgb(19, 180, 153)" />
              <stop offset="100%" stopColor="rgb(0, 110, 136)" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-72 md:px-60 mt-56"
        >
          <h1 className="bg-clip-text bg-linear-to-r font-bold from-secondary md:text-6xl text-3xl text-center text-transparent to-primary">
            เปลี่ยนเป็น Full Stack Developer ภายใน 6 เดือน
          </h1>
          <p className="font-normal mb-8 md:text-xl mt-4 text-base text-center">
            หลักสูตรเข้มข้น 12 สัปดาห์ พร้อมโอกาสฝึกงานจริง 12 สัปดาห์
            เพื่อเตรียมคุณให้พร้อมทำงานในบริษัทชั้นนำ
          </p>
          <Button
            variant="primaryGradientBorder"
            text="ปรึกษา Mentors ฟรี"
            shape="rounded"
            onClick={openModalButton}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={whyUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="[html[data-theme='dark']_&]:text-secondary font-bold mb-8 text-3xl text-center text-primary"
        >
          ทำไมต้องเรียนกับเรา?
        </motion.h2>
        <motion.div
          ref={whyUsRef}
          initial="hidden"
          animate={whyUsInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          className="flex flex-col gap-8 items-center justify-center md:flex-row"
        >
          {whyUsData.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
            >
              <WhyUsCard
                icon={getIcon(item.iconType)}
                title={item.title}
                subtitle={item.subtitle}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={coursesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="[html[data-theme='dark']_&]:text-secondary font-bold mt-24 text-3xl text-center text-primary"
        >
          รายละเอียดคอร์ส
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={coursesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-normal mb-8 mt-2 text-base text-center"
        >
          เปลี่ยนอาชีพด้วยหลักสูตร Bootcamp ที่เข้มข้น
        </motion.p>
        <motion.div
          ref={coursesRef}
          initial="hidden"
          animate={coursesInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.4 } },
          }}
          className="flex flex-col gap-8 items-center justify-center mb-42 md:flex-row md:items-stretch"
        >
          {sortedBootcamps.length === 0 ? (
            <div className="text-center text-primary">ไม่พบข้อมูล Bootcamp</div>
          ) : (
            sortedBootcamps.map((bootcamp) => (
              <motion.div
                key={bootcamp.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                }}
              >
                <CourseCard
                  id={bootcamp.id}
                  coverImage={bootcamp.src}
                  alt={bootcamp.alt}
                  title={bootcamp.title}
                  description={bootcamp.description}
                  bulletPoints={bootcamp.bulletPoints}
                  imageBadgeText={bootcamp.imageBadgeText}
                  classType={bootcamp.classType}
                  textButton="ดูรายละเอียด"
                  showAccordion={false}
                  onButtonClick={() => router.push(bootcamp.link)}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      {/* Mentor Form Modal */}
      <MentorFormModal open={openModal} onClose={closeModalButton} />
    </>
  );
}
