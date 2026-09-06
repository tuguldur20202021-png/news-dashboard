import React from 'react';
import { FadeIn } from '../components/FadeIn';

const services = [
  {
    num: "01",
    name: "Web Development",
    desc: "Building interactive dashboards, React+Vite web apps, and spaced repetition tools with sleek, modern UI/UX."
  },
  {
    num: "02",
    name: "Digital Products",
    desc: "Designing premium AI prompt packs (NovaMind), Canva templates, and digital downloads targeted for Gumroad and Etsy."
  },
  {
    num: "03",
    name: "Data Visualization",
    desc: "Automating KPI tracking and creating high-quality, editorial-style presentations using Python, Pandas, and pptxgenjs."
  },
  {
    num: "04",
    name: "Academic Leadership",
    desc: "Leading debate teams, structuring evidence-based arguments, and building structured SAT & Science study materials."
  },
  {
    num: "05",
    name: "Premium Design",
    desc: "Crafting digital experiences focused on premium dark aesthetics, gold accents, and elegant typography like Abril Fatface."
  }
];

export const ServicesSection = () => {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 text-[#0B0B12]">
      <FadeIn delay={0} y={40}>
        <h2 className="font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 leading-none" style={{ fontFamily: "'Abril Fatface', serif" }}>
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((svc, i) => (
          <FadeIn 
            key={svc.num} 
            delay={i * 0.1} 
            y={30}
            className="flex flex-col md:flex-row md:items-center py-8 sm:py-10 md:py-12 border-b border-[rgba(11,11,18,0.15)] first:border-t"
          >
            <div className="font-black text-[clamp(3rem,10vw,140px)] leading-none md:w-1/3 mb-4 md:mb-0 shrink-0">
              {svc.num}
            </div>
            <div className="flex flex-col md:w-2/3">
              <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] mb-2 sm:mb-4">
                {svc.name}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60">
                {svc.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
