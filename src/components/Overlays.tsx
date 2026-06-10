import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Gem, ShieldCheck, Sparkles } from 'lucide-react';

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
  { icon: Gem, label: 'Bespoke Setting' },
  { icon: ShieldCheck, label: 'Ethical Sourcing' },
  { icon: Sparkles, label: 'Lifetime Care' },
];

export const Overlays = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.fade-in-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Staggered reveals for lists
    gsap.utils.toArray('.stagger-list').forEach((list: any) => {
      gsap.fromTo(list.children, 
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex flex-col pointer-events-none">
      
      {/* Full-screen subtle vignette to ensure text contrast without harsh boxes */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] z-[-1]"></div>

      {/* Navigation (Minimalist) */}
      <header className="fixed left-0 right-0 top-0 z-50 mix-blend-difference pointer-events-auto">
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-8 text-white md:px-12">
          <a className="font-display text-xl tracking-[0.3em] uppercase" href="#hero">
            Aurelia
          </a>
          <div className="hidden items-center gap-10 text-xs uppercase tracking-[0.25em] text-white/70 md:flex">
            <a className="transition-colors hover:text-white" href="#collection">Collection</a>
            <a className="transition-colors hover:text-white" href="#atelier">Atelier</a>
            <a className="transition-colors hover:text-white" href="#visit">Visit</a>
          </div>
        </nav>
      </header>

      {/* Page 0: Hero */}
      <section id="hero" className="min-h-screen w-full flex items-center justify-center px-8 md:px-16 relative">
        <div className="fade-in-section w-full max-w-7xl flex flex-col items-center text-center mt-32 pointer-events-auto">
          <p className="mb-8 text-[10px] md:text-xs uppercase tracking-[0.4em] text-champagne">High Jewellery Atelier</p>
          <h1 className="font-display text-6xl leading-[0.9] md:text-[120px] lg:text-[150px] text-white tracking-tight">
            Aurelia Maison
          </h1>
          <p className="mt-12 max-w-lg text-base leading-relaxed text-white/60 font-light md:text-lg">
            Diamond pieces composed with architectural restraint, warm metalwork, and a private-salon sense of occasion.
          </p>
        </div>
      </section>

      {/* Page 1: Collection */}
      <section id="collection" className="min-h-screen py-32 w-full flex items-center justify-end px-8 md:px-16 lg:px-32 relative">
        <div className="max-w-xl pointer-events-auto mix-blend-screen">
          <div className="fade-in-section mb-16">
            <h2 className="font-display text-5xl leading-tight md:text-7xl text-white mb-6">The Salon Edit</h2>
            <p className="text-white/50 text-sm tracking-widest uppercase">Pieces with presence</p>
          </div>
          
          <div className="stagger-list flex flex-col gap-10">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <p className="text-[9px] uppercase tracking-[0.3em] text-champagne mb-3">{product.category}</p>
                <div className="flex justify-between items-baseline border-b border-white/10 pb-6 group-hover:border-white/40 transition-colors duration-500">
                  <div className="pr-8">
                    <h3 className="font-display text-3xl mb-2 text-white group-hover:text-champagne transition-colors duration-500">{product.name}</h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">{product.description}</p>
                  </div>
                  <span className="text-lg font-display text-white/80 shrink-0">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 2: Atelier Story */}
      <section id="atelier" className="min-h-screen py-32 w-full flex items-center justify-start px-8 md:px-16 lg:px-32 relative">
        <div className="max-w-xl pointer-events-auto mix-blend-screen">
          <div className="fade-in-section mb-16">
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-champagne">The Process</p>
            <h2 className="font-display text-5xl leading-[1.1] md:text-7xl text-white">Built at the bench.</h2>
          </div>
          
          <div className="fade-in-section">
            <p className="text-white/60 text-lg leading-[1.8] font-light mb-16">
              Every Aurelia piece passes through drawing, wax, casting, stone matching, and final polish.
              The result is jewellery that feels composed rather than decorated. Our digital fitting process allows for an unprecedented level of precision before casting.
            </p>
            
            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-10">
              <div>
                <span className="text-4xl font-display block mb-3 text-white">1920</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50">The First Bench</span>
              </div>
              <div>
                <span className="text-4xl font-display block mb-3 text-white">2026</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50">Digital Fittings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page 3: Visit */}
      <section id="visit" className="min-h-screen py-32 w-full flex items-center justify-center relative text-center">
        <div className="fade-in-section max-w-3xl px-8 pointer-events-auto mix-blend-screen">
          <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-champagne">Private Appointments</p>
          <h2 className="font-display text-5xl leading-[1.1] md:text-8xl text-white mb-24">A quieter way<br/><i className="text-white/60">to choose forever.</i></h2>
          
          <div className="grid md:grid-cols-3 gap-12 mb-24">
            {services.map(({ label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-px h-12 bg-gradient-to-b from-champagne to-transparent mb-6"></div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/80">{label}</p>
              </div>
            ))}
          </div>
          
          <button className="group relative inline-flex items-center justify-center">
            <div className="absolute inset-0 border border-white/30 rounded-full scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
            <span className="bg-white text-black uppercase tracking-[0.25em] text-xs px-12 py-5 rounded-full font-medium transition-colors hover:bg-champagne hover:text-black">
              Book a Viewing
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
