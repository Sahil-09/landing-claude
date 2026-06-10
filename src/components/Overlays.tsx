import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Gem, Menu, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Solenne Halo Ring',
    description: 'A sculptural gold setting around a brilliant-cut centre stone.',
    price: '$4,850',
    category: 'Featured',
  },
  {
    id: 2,
    name: 'Nocturne Tennis Bracelet',
    description: 'Hand-set stones arranged for a quiet, continuous flash.',
    price: '$6,200',
    category: 'Bracelets',
  },
  {
    id: 3,
    name: 'Lumiere Drop Earrings',
    description: 'Balanced pear-cut crystals in a warm vermeil frame.',
    price: '$2,140',
    category: 'Earrings',
  },
];

const services = [
  { icon: Gem, label: 'Bespoke setting consultations' },
  { icon: ShieldCheck, label: 'Certified ethical sourcing' },
  { icon: Sparkles, label: 'Lifetime cleaning and care' },
];

export const Overlays = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade in text elements as they enter the viewport
    const sections = gsap.utils.toArray('.fade-in-section');
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex flex-col">
      {/* Navigation (Sticky) */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-glass-border bg-ink/30 backdrop-blur-2xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 text-white md:px-8">
          <a className="font-display text-lg tracking-[0.22em]" href="#hero">
            AURELIA
          </a>
          <div className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-white/72 md:flex">
            <a className="transition hover:text-white" href="#collection">Collection</a>
            <a className="transition hover:text-white" href="#atelier">Atelier</a>
            <a className="transition hover:text-white" href="#visit">Visit</a>
          </div>
          <button className="grid size-10 place-items-center border border-white/10 bg-glass text-white transition hover:bg-white/10 md:hidden" aria-label="Open navigation">
            <Menu size={18} />
          </button>
        </nav>
      </header>

      {/* Page 0: Hero */}
      <section id="hero" className="h-screen w-full flex items-center justify-start px-5 md:px-16 lg:px-32 relative pointer-events-none">
        <div className="fade-in-section max-w-2xl pointer-events-auto mt-20">
          <p className="mb-5 text-xs uppercase tracking-[0.32em] text-champagne">High jewellery atelier</p>
          <h1 className="font-display text-5xl leading-[0.96] md:text-7xl lg:text-[100px] text-white">
            Aurelia Maison
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/60 font-light md:text-xl">
            Diamond pieces composed with architectural restraint, warm metalwork, and a private-salon sense of occasion.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-glass-border text-white uppercase tracking-[0.18em] text-sm px-8 py-4 rounded-full font-medium shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" href="#collection">
              Explore collection <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Page 1: Collection */}
      <section id="collection" className="min-h-screen py-32 w-full flex items-center justify-end px-5 md:px-16 lg:px-32 relative pointer-events-none">
        <div className="fade-in-section max-w-xl bg-black/40 backdrop-blur-3xl border border-glass-border rounded-3xl p-8 md:p-12 pointer-events-auto shadow-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-champagne">New Salon Edit</p>
          <h2 className="font-display text-4xl leading-tight md:text-6xl mb-8 text-white">Pieces with presence.</h2>
          
          <div className="flex flex-col gap-6">
            {products.map((product) => (
              <div key={product.id} className="group border-b border-glass-border pb-6 last:border-0 last:pb-0 transition-colors hover:border-champagne/30 cursor-pointer">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{product.category}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-display text-2xl mb-2 text-white group-hover:text-champagne transition-colors">{product.name}</h3>
                    <p className="text-sm text-white/50">{product.description}</p>
                  </div>
                  <span className="text-lg font-light text-white/80">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 2: Atelier Story */}
      <section id="atelier" className="min-h-screen py-32 w-full flex items-center justify-start px-5 md:px-16 lg:px-32 relative pointer-events-none">
        <div className="fade-in-section max-w-2xl bg-gradient-to-br from-black/80 to-transparent backdrop-blur-3xl border-l border-t border-glass-border rounded-3xl p-8 md:p-14 pointer-events-auto shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-champagne">Atelier Story</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl mb-6 text-white">Built at the bench, finished for the room.</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Every Aurelia piece passes through drawing, wax, casting, stone matching, and final polish.
            The result is jewellery that feels composed rather than decorated. Our digital fitting process allows for an unprecedented level of precision before casting.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-l-2 border-champagne/30 pl-4">
              <span className="text-3xl font-display block mb-1 text-white">1920</span>
              <span className="text-xs uppercase tracking-widest text-white/40">The First Bench</span>
            </div>
            <div className="border-l-2 border-champagne/30 pl-4">
              <span className="text-3xl font-display block mb-1 text-white">2026</span>
              <span className="text-xs uppercase tracking-widest text-white/40">Digital Fittings</span>
            </div>
          </div>
        </div>
      </section>

      {/* Page 3: Visit */}
      <section id="visit" className="min-h-screen py-32 w-full flex items-center justify-center relative pointer-events-none text-center">
        <div className="fade-in-section max-w-4xl mx-5 pointer-events-auto">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-champagne">Private Appointments</p>
          <h2 className="font-display text-5xl leading-tight md:text-7xl mb-16 text-white">A quieter way to choose forever.</h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {services.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-black/50 backdrop-blur-2xl border border-glass-border p-8 rounded-2xl transition hover:bg-white/5 hover:border-white/20">
                <div className="mx-auto size-12 rounded-full bg-white/5 border border-glass-border grid place-items-center mb-6">
                  <Icon className="text-champagne" size={20} />
                </div>
                <p className="text-sm tracking-wide text-white/80">{label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <button className="bg-white text-black uppercase tracking-[0.18em] text-sm px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              Book a Viewing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
