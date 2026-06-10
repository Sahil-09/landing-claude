import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles } from '@react-three/drei';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import type { Group } from 'three';
import { DiamondRing } from './DiamondRing';
import './Hero.css';

interface HeroProps {
  className?: string;
}

const HeroModel = () => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.18;
    groupRef.current.rotation.x = -0.12 + pointer.y * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <DiamondRing scale={2.1} position={[0, -0.1, 0]} />
      </Float>
      <Sparkles count={90} size={2.4} scale={[5, 3.2, 4]} color="#fff6d8" speed={0.35} />
    </group>
  );
};

export const HeroSection: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section id="top" className={`hero-section relative min-h-screen overflow-hidden bg-ink text-white ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(217,184,117,0.26),transparent_30%),linear-gradient(115deg,#161311_0%,#2a2726_44%,#081217_100%)]" />
      <div className="absolute inset-0 marble-veil" />

      <Canvas
        camera={{ position: [0, 0.45, 5.2], fov: 38 }}
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.45} />
        <spotLight position={[2.6, 4, 3]} angle={0.5} penumbra={0.8} intensity={3.6} castShadow />
        <pointLight position={[-3, -1, 2]} intensity={1.1} color="#d9b875" />
        <HeroModel />
        <Environment preset="city" />
      </Canvas>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-end px-5 pb-24 pt-28 md:px-8 md:pb-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.32em] text-champagne">High jewellery atelier</p>
          <h1 className="font-display text-5xl leading-[0.96] md:text-7xl lg:text-8xl">
            Aurelia Maison
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-champagne md:text-xl">
            Diamond pieces composed with architectural restraint, warm metalwork, and a private-salon sense of occasion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 bg-champagne text-ink uppercase tracking-[0.18em] text-sm px-8 py-4 rounded-lg font-medium shadow-sm transform hover:scale-105 transition-colors duration-200 hover:bg-white" href="#collection">
              Explore collection <ArrowUpRight size={16} />
            </a>
            <a className="inline-flex items-center border border-white/20 px-6 py-4 text-sm uppercase tracking-[0.18em] text-white/82 transition hover:bg-white/10" href="#atelier">
              Our atelier
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
};
