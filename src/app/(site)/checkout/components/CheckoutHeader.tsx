import { SparkleIcon } from "@phosphor-icons/react/dist/csr/Sparkle";
import { motion } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/common/badge";

import { CHECKOUT_HEADER } from "../utils/checkoutConstants";

export const CheckoutHeader = () => {
  const headerRef = useRef(null);

  return (
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-16 items-center justify-end lg:pt-48 pb-16 pt-24 px-4 w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center max-w-4xl w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-clip-text bg-linear-to-r font-bold font-prompt from-secondary lg:text-6xl text-4xl text-center text-transparent to-primary"
        >
          {CHECKOUT_HEADER.TITLE}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-normal font-prompt lg:text-xl text-center text-lg"
        >
          {CHECKOUT_HEADER.SUBTITLE}
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Badge
          variant="transparentSecondary"
          size="sm"
          text={CHECKOUT_HEADER.BADGE_TEXT}
          icon={<SparkleIcon size={16} color="#13b499" weight="bold" />}
        />
      </motion.div>
    </motion.div>
  );
};
