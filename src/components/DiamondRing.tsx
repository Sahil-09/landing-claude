import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import * as THREE from 'three';
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
  
  // Track mouse for interactive follow effect
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Set up GSAP animations based on native scroll
  useGSAP(() => {
    if (!groupRef.current) return;

    // We can animate the 3D object directly via its ref properties.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero", 
        start: "top top",
        endTrigger: "#visit", 
        end: "bottom bottom",
        scrub: 1.5, // Smoother scrubbing
      }
    });

    // Initial state (Hero)
    gsap.set(groupRef.current.position, { x: 0, y: position[1], z: position[2] });
    gsap.set(groupRef.current.rotation, { x: 0.2, y: 0, z: 0 });
    gsap.set(groupRef.current.scale, { x: scale, y: scale, z: scale });

    // Transition to Collection (moves left to balance text on right, spins wildly, scales down, comes down)
    tl.to(groupRef.current.position, { x: -1.5, y: 0, z: -1, ease: "power1.inOut" }, 0)
      .to(groupRef.current.rotation, { x: 1.2, y: Math.PI * 2, z: 0.5, ease: "power1.inOut" }, 0)
      .to(groupRef.current.scale, { x: scale * 0.7, y: scale * 0.7, z: scale * 0.7, ease: "power1.inOut" }, 0);

    // Transition to Atelier (moves right, pushes into camera, shows side profile)
    tl.to(groupRef.current.position, { x: 1.5, y: 0, z: 1, ease: "power1.inOut" }, 1)
      .to(groupRef.current.rotation, { x: -0.2, y: Math.PI * 3.5, z: -0.8, ease: "power1.inOut" }, 1)
      .to(groupRef.current.scale, { x: scale * 1.5, y: scale * 1.5, z: scale * 1.5, ease: "power1.inOut" }, 1);

    // Transition to Visit (centers, zooms far out, straightens up)
    tl.to(groupRef.current.position, { x: 0, y: 0.5, z: 0, ease: "power2.out" }, 2)
      .to(groupRef.current.rotation, { x: 0.5, y: Math.PI * 4, z: 0, ease: "power2.out" }, 2)
      .to(groupRef.current.scale, { x: scale * 0.8, y: scale * 0.8, z: scale * 0.8, ease: "power2.out" }, 2);

  }, { dependencies: [scale, position] });

  // Continuous interaction loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      // 1. Interactive Mouse Follow
      // Map pointer from [-1, 1] to slight rotation angles
      mouseTarget.current.x = THREE.MathUtils.lerp(mouseTarget.current.x, state.pointer.x * 0.3, 0.1);
      mouseTarget.current.y = THREE.MathUtils.lerp(mouseTarget.current.y, state.pointer.y * 0.3, 0.1);
      
      // Apply mouse rotation on top of GSAP rotation using a wrapper group or offsetting
      // We apply it directly to the group for a subtle tilt effect
      groupRef.current.rotation.y += (mouseTarget.current.x - groupRef.current.rotation.y * 0.1) * delta;
      groupRef.current.rotation.x += (-mouseTarget.current.y - groupRef.current.rotation.x * 0.1) * delta;

      // 2. Idle animations for the components
      if (diamondRef.current) {
        diamondRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      }
      if (ringRef.current) {
        ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
      }
      
      // 3. Float effect
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.5) * 0.002;
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
        {/* Main Diamond */}
        <mesh castShadow>
          <octahedronGeometry args={[0.22, 2]} />
          <MeshTransmissionMaterial 
            backside
            samples={16}
            thickness={0.5}
            chromaticAberration={0.15}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.0}
            ior={2.42}
            color="#ffffff"
            transmission={1}
            roughness={0}
            envMapIntensity={3}
          />
        </mesh>

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
