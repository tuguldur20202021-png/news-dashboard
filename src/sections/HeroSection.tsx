import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';

export const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col overflow-x-clip relative w-full">
      <FadeIn delay={0} y={-20} className="w-full">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#price" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 relative">
        <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-20">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.5vw] lowercase">
              Hi, i&apos;m tuugii
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[180px] sm:max-w-[240px] md:max-w-[300px]">
            a 16-year-old student & digital creator building premium tools and aiming for top universities
          </p>
        </FadeIn>
        
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
        <Magnet padding={150} strength={3} className="pointer-events-auto">
          <img 
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
            alt="Tuugii Portrait" 
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-contain"
          />
        </Magnet>
      </FadeIn>
    </section>
  );
};
