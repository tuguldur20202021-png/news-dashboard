import React from 'react';
import { motion } from 'framer-motion';

export const LiveProjectButton = ({ className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "rgba(215, 226, 234, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors ${className}`}
    >
      Live Project
    </motion.button>
  );
};
