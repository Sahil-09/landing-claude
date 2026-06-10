import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null!);
  const timelineRef = useRef<HTMLDivElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (sectionRef.current && timelineRef.current && textRef.current) {
      // Timeline animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate timeline dots
      tl.fromTo(
        timelineRef.current.querySelectorAll('.timeline-dot'),
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        }
      );

      // Animate connecting lines
      tl.fromTo(
        timelineRef.current.querySelectorAll('.timeline-line'),
        {
          width: 0,
        },
        {
          width: '100%',
          duration: 1,
          ease: 'power2.inOut',
        }
      );

      // Animate text
      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <section id="atelier" ref={sectionRef} className="section relative min-h-screen bg-stone px-5 py-20 text-white md:px-8">
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:44px_44px]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={timelineRef} className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-champagne/22" />

            {[
              { year: '1920', title: 'The First Bench', desc: 'A small atelier begins with hand-drawn settings and old-world tools.' },
              { year: '1945', title: 'Salon Craft', desc: 'Private commissions define the maison: fewer pieces, deeper attention.' },
              { year: '1980', title: 'Global Stones', desc: 'A wider network of cutters expands the range of rare diamonds.' },
              { year: '2026', title: 'Digital Fittings', desc: '3D previews make custom pieces easier to inspect before casting.' },
            ].map((item, index) => (
              <div key={index} className="relative mb-12 group">
                <div className="absolute left-0 flex h-16 w-16 items-center justify-center border border-champagne/70 bg-ink">
                  <span className="text-sm font-light text-champagne">{item.year}</span>
                </div>
                <div className="ml-24">
                  <div className="timeline-dot mb-4 h-px bg-champagne/25" />
                  <h3 className="font-display text-2xl text-white transition-colors duration-300 group-hover:text-champagne">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed text-white/55">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div ref={textRef} className="text-center lg:text-left">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-champagne">Atelier Story</p>
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6">
              Built at the bench, finished for the room.
            </h2>
            <p className="text-white/64 text-xl leading-relaxed mb-8 max-w-2xl">
              Every Aurelia piece passes through drawing, wax, casting, stone matching, and final polish. The result is jewellery
              that feels composed rather than decorated.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-px w-10 bg-champagne" />
                <span className="text-champagne font-medium text-lg">Hand-set stones</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-px w-10 bg-champagne" />
                <span className="text-champagne font-medium text-lg">Traceable materials</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-px w-10 bg-champagne" />
                <span className="text-champagne font-medium text-lg">Long-term care</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="parallax-gem absolute left-10 top-20 h-8 w-8 border border-champagne/35" />
      <div className="parallax-gem absolute bottom-20 right-10 h-12 w-12 border border-champagne/25" />
    </section>
  );
};
