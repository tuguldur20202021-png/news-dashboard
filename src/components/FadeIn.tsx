import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number | string;
  y?: number | string;
  className?: string;
  as?: React.ElementType;
} & MotionProps;

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 1.2,
  x = 0,
  y = 40,
  className,
  as = 'div',
  ...rest
}) => {
  const Component = motion.create(as as any);
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // Super smooth Expo-Out easing
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
};
