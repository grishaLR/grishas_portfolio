import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface BrainProps {}

export default (() => {
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={null}>
          <BrainModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}) as React.FC<BrainProps>;

const BrainModel: React.FC = () => {
  const gltf = useGLTF('/brain_model/scene.gltf');
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Rotate the brain model
    }
  });

  return <primitive ref={ref} object={gltf.scene} scale={0.5} />;
};

// Ensure you import and load the GLTFLoader in your useGLTF hook.
useGLTF.preload('/brain_model/scene.gltf');
