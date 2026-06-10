import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DiamondRingProps {
  scale?: number;
  position?: [number, number, number];
}

export const DiamondRing: React.FC<DiamondRingProps> = ({ scale = 1, position = [0, 0, 0] }) => {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const diamondRef = useRef<Group>(null);

  // Set up GSAP animations based on native scroll
  useGSAP(() => {
    if (!groupRef.current) return;

    // We can animate the 3D object directly via its ref properties.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero", // Just start at the top
        start: "top top",
        endTrigger: "#visit", // End at the visit section
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    });

    // Initial state (Hero)
    gsap.set(groupRef.current.position, { x: 0, y: position[1], z: position[2] });
    gsap.set(groupRef.current.rotation, { x: 0, y: 0, z: 0 });
    gsap.set(groupRef.current.scale, { x: scale, y: scale, z: scale });

    // Transition to Collection (moves to right, tilts)
    tl.to(groupRef.current.position, { x: 1.5, ease: "none" }, 0)
      .to(groupRef.current.rotation, { x: 0.8, y: Math.PI, ease: "none" }, 0)
      .to(groupRef.current.scale, { x: scale * 1.2, y: scale * 1.2, z: scale * 1.2, ease: "none" }, 0);

    // Transition to Atelier (moves left, rotates back)
    tl.to(groupRef.current.position, { x: -1.5, ease: "none" }, 1)
      .to(groupRef.current.rotation, { x: -0.4, y: Math.PI * 2, z: 0.5, ease: "none" }, 1)
      .to(groupRef.current.scale, { x: scale * 1.5, y: scale * 1.5, z: scale * 1.5, ease: "none" }, 1);

    // Transition to Visit (centers, returns to normal)
    tl.to(groupRef.current.position, { x: 0, ease: "none" }, 2)
      .to(groupRef.current.rotation, { x: 0.2, y: Math.PI * 3, z: 0, ease: "none" }, 2)
      .to(groupRef.current.scale, { x: scale, y: scale, z: scale, ease: "none" }, 2);

  }, { dependencies: [scale, position] });

  // Add a continuous slow idle spin that runs on top of GSAP positioning
  useFrame((state) => {
    if (groupRef.current) {
      // We only animate a continuous secondary rotation on the diamond itself
      // so it doesn't conflict with GSAP's timeline on the main group.
      if (diamondRef.current) {
        diamondRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      }
      if (ringRef.current) {
        ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      }
      
      // Floating effect
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh ref={ringRef} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.055, 64, 256]} />
        <meshPhysicalMaterial 
          color="#d9b875" 
          metalness={1} 
          roughness={0.05} 
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      <group ref={diamondRef} position={[0, 0.5, 0]}>
        {/* Main Diamond - Maxed out for ultra-realism */}
        <mesh castShadow>
          <octahedronGeometry args={[0.22, 2]} />
          <MeshTransmissionMaterial 
            backside
            samples={16} // High quality
            thickness={0.5}
            chromaticAberration={0.15} // High dispersion
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.0} // Disable animation on distortion to look like solid glass
            ior={2.42} // Diamond IOR
            color="#ffffff"
            transmission={1}
            roughness={0}
            envMapIntensity={3}
          />
        </mesh>

        {/* Inner geometric core to simulate internal reflections */}
        <mesh scale={0.9}>
          <octahedronGeometry args={[0.22, 1]} />
          <MeshTransmissionMaterial 
            backside
            samples={8}
            thickness={0.2}
            ior={2.42}
            color="#eef8ff"
            transmission={0.9}
          />
        </mesh>
      </group>

      {/* Side Diamonds */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.24, 0.41, 0]} castShadow>
          <octahedronGeometry args={[0.08, 1]} />
          <MeshTransmissionMaterial 
            backside
            samples={8}
            thickness={0.1}
            chromaticAberration={0.1}
            ior={2.42}
            color="#ffffff"
            transmission={1}
          />
        </mesh>
      ))}
    </group>
  );
};
