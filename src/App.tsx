import { ArrowUpRight, Gem, Menu, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroSection } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ScrollController } from './components/ScrollController';
import { StorySection } from './components/StorySection';

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

export const App = () => {
  return (
    <ScrollController>
      <main className="min-h-screen bg-ivory text-ink">
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/15 bg-ink/45 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 text-white md:px-8">
            <a className="font-display text-lg tracking-[0.22em]" href="#top">
              AURELIA
            </a>
            <div className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-white/72 md:flex">
              <a className="transition hover:text-white" href="#collection">Collection</a>
              <a className="transition hover:text-white" href="#atelier">Atelier</a>
              <a className="transition hover:text-white" href="#visit">Visit</a>
            </div>
            <button className="grid size-10 place-items-center border border-white/20 bg-white/10 text-white transition hover:bg-white/18 md:hidden" aria-label="Open navigation">
              <Menu size={18} />
            </button>
          </nav>
        </header>

        <HeroSection />

        <section id="collection" className="section bg-ink px-5 py-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.28em] text-champagne">New Salon Edit</p>
                <h2 className="font-display text-4xl leading-tight md:text-6xl">Pieces with presence.</h2>
              </div>
              <a className="inline-flex items-center gap-2 self-start border border-white/15 px-5 py-3 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-ink md:self-auto" href="#visit">
                Book a viewing <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <StorySection />

        <section id="visit" className="section bg-ivory px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-bronze">Private Appointments</p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">A quieter way to choose forever.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {services.map(({ icon: Icon, label }) => (
                <div key={label} className="border border-ink/10 bg-white p-5">
                  <Icon className="mb-8 text-bronze" size={24} />
                  <p className="text-sm leading-6 text-ink/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ScrollController>
  );
};
