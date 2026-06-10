import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import type { Group } from 'three';
import { DiamondRing } from './DiamondRing';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
  };
}

const ProductModel: React.FC<{ hovered: boolean; variant: number }> = ({ hovered, variant }) => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (hovered ? 0.55 : 0.22);
    groupRef.current.position.y = hovered ? 0.12 : 0;
  });

  return (
    <group ref={groupRef} rotation={[0.15, variant * 0.6, 0]}>
      <Float speed={1.8} rotationIntensity={0.12} floatIntensity={0.25}>
        <DiamondRing scale={1.35} />
      </Float>
    </group>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className="group relative min-h-[460px] overflow-hidden border border-white/10 bg-white/[0.045]"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(217,184,117,0.18),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-[64%]">
        <Canvas camera={{ position: [0, 0.25, 4], fov: 42 }} dpr={[1, 1.75]}>
          <ambientLight intensity={0.45} />
          <spotLight position={[3, 4, 2]} intensity={2.2} angle={0.45} penumbra={0.8} />
          <ProductModel hovered={hovered} variant={product.id} />
          <Environment preset="studio" />
        </Canvas>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-4 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />
        <p className="mb-2 text-xs uppercase tracking-[0.24em] text-champagne">{product.category}</p>
        <h3 className="font-display text-2xl text-white">{product.name}</h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-white/62">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-xl text-white">{product.price}</span>
          <button className="border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/80 transition hover:bg-white hover:text-ink">
            Details
          </button>
        </div>
      </div>
    </motion.article>
  );
};
