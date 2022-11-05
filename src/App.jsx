import { Canvas } from '@react-three/fiber';
import React, { Suspense, useState, useEffect } from 'react';
import { Scene } from './Scene';
import Keyboard from '@/components/Keyboard';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    }
  }, [loading]);

  if (loading) return <Keyboard />;

  return (
    <Canvas>
      <ambientLight />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
