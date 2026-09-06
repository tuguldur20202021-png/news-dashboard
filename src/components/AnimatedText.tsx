import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCount = 0;

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const res = (
          <span key={wordIndex} className="mr-[0.25em] flex">
            {wordChars.map((char, charIndex) => {
              const start = charCount / totalChars;
              const end = (charCount + 1) / totalChars;
              charCount++;
              
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

              return (
                <span key={charIndex} className="relative">
                  <span className="invisible">{char}</span>
                  <motion.span 
                    className="absolute top-0 left-0"
                    style={{ opacity }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
        charCount++; // for space
        return res;
      })}
    </p>
  );
};
