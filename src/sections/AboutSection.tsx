import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { Float } from '../components/Float';

export const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      
      {/* Top Left */}
      <FadeIn delay={0.1} x={-80} y={0} duration={1.2} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
        <Float delay={0.1} duration={4} yOffset={-15}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" 
            alt="Moon icon" 
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain"
          />
        </Float>
      </FadeIn>

      {/* Top Right */}
      <FadeIn delay={0.2} x={80} y={0} duration={1.2} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
        <Float delay={0.8} duration={5} yOffset={-20}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" 
            alt="Lego icon" 
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain"
          />
        </Float>
      </FadeIn>

      {/* Bottom Left */}
      <FadeIn delay={0.3} x={-80} y={0} duration={1.2} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
        <Float delay={1.5} duration={4.5} yOffset={-12}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" 
            alt="3D object" 
            className="w-[100px] sm:w-[140px] md:w-[180px] object-contain"
          />
        </Float>
      </FadeIn>

      {/* Bottom Right */}
      <FadeIn delay={0.4} x={80} y={0} duration={1.2} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
        <Float delay={0.4} duration={6} yOffset={-18}>
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" 
            alt="3D group" 
            className="w-[130px] sm:w-[170px] md:w-[220px] object-contain"
          />
        </Float>
      </FadeIn>

      <div className="z-10 flex flex-col items-center text-center">
        <FadeIn delay={0} y={50} duration={1.2}>
          <h2 className="hero-heading uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>
        
        <div className="mt-10 sm:mt-14 md:mt-16 mb-16 sm:mb-20 md:mb-24 flex flex-col items-center">
          <AnimatedText 
            text="I'm a 16-year-old student based in Ulaanbaatar, Mongolia. I blend academic excellence with digital entrepreneurship — from leading debate teams and crushing SAT prep to building React apps, creating premium digital products, and automating data visualizations for colleges. I love premium dark aesthetics and building things that stand out." 
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] justify-center text-center"
          />
        </div>
        
        <FadeIn delay={0.2} y={30}>
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  );
};
