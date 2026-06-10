import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { DoubleSide } from 'three';

interface DiamondRingProps {
  scale?: number;
  position?: [number, number, number];
}

const DiamondMaterial = () => {
  return (
    <meshPhysicalMaterial
      color="#eaf8ff"
      metalness={0}
      roughness={0.02}
      transmission={0.58}
      thickness={0.8}
      ior={2.3}
      transparent
      opacity={0.72}
      side={DoubleSide}
    />
  );
};

export const DiamondRing: React.FC<DiamondRingProps> = ({ scale = 1, position = [0, 0, 0] }) => {
  const ringRef = useRef<Mesh>(null);
  const diamondRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
    }
    if (diamondRef.current) {
      diamondRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={ringRef} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.055, 28, 128]} />
        <meshStandardMaterial color="#d9b875" metalness={0.94} roughness={0.18} />
      </mesh>

      <group ref={diamondRef} position={[0, 0.5, 0]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.19, 0]} />
          <DiamondMaterial />
        </mesh>
        <mesh position={[0, -0.19, 0]} scale={[0.86, 0.32, 0.86]}>
          <octahedronGeometry args={[0.19, 0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
      </group>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.24, 0.41, 0]} castShadow>
          <octahedronGeometry args={[0.08, 0]} />
          <DiamondMaterial />
        </mesh>
      ))}

      <mesh position={[0, 0.1, -0.08]} scale={[1, 0.25, 0.4]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#fff5cf" transparent opacity={0.16} />
      </mesh>
    </group>
  );
};
