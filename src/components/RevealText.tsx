import React from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    }
  };

  const child = {
    hidden: { y: "120%", rotate: 5, opacity: 0 },
    visible: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { ease: [0.16, 1, 0.3, 1], duration: 1.2 }
    }
  };

  return (
    <motion.h1 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={`hero-heading font-black tracking-tight leading-[0.9] w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw] lowercase flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden pb-4 sm:pb-6 mr-[3%]">
          <motion.span variants={child} className="inline-block origin-bottom-left">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.h1>
  );
};
