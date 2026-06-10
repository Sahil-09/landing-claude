import { Environment, Caustics } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Noise } from '@react-three/postprocessing';
import { DiamondRing } from './DiamondRing';

export const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={3} castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#d9b875" />

      {/* Caustics layer for ultra-realistic light refraction on an invisible floor */}
      <Caustics
        backside
        color="#ffffff"
        position={[0, -1, 0]}
        lightSource={[5, 10, 5]}
        intensity={0.2}
        worldRadius={0.1}
        ior={1.8}
        backsideIOR={1.1}
        causticsOnly={false}
      >
        <DiamondRing position={[0, 2.0, 0]} scale={3.5} />
      </Caustics>

      {/* Studio lighting environment for realistic reflections */}
      <Environment preset="studio" />

      {/* Post-processing for luxury cinematic look */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} height={480} />
        <Noise opacity={0.03} />
      </EffectComposer>
    </>
  );
};
