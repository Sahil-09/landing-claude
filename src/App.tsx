import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Overlays } from './components/Overlays';

export const App = () => {
  return (
    <div className="w-full bg-ink relative">
      {/* 3D Background locked in place */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#000000']} />
          <Scene />
        </Canvas>
      </div>
      
      {/* Scrollable HTML content on top */}
      <div className="relative z-10 w-full">
        <Overlays />
      </div>
    </div>
  );
};
