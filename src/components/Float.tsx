import React from 'react';
import { motion } from 'framer-motion';

interface FloatProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const Float: React.FC<FloatProps> = ({ 
  children, 
  delay = 0, 
  duration = 4,
  yOffset = -15,
  className = "" 
}) => {
  return (
    <motion.div
      animate={{ y: [0, yOffset, 0] }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
