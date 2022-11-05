import * as THREE from 'three';
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

function Keyboard({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/keyboard-v1-transformed.glb');
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );
    ref.current.position.set(data.x * width, (data.y += 0.025), z);
  });

  return (
    <group ref={ref} dispose={null}>
      <mesh
        geometry={nodes.Object_2001.geometry}
        material={materials.Small_Buttons}
      />
      <mesh
        geometry={nodes.Object_2001_1.geometry}
        material={materials.Big_Buttons}
      />
      <mesh
        geometry={nodes.Object_2001_2.geometry}
        material={materials.Chassis}
      />
    </group>
  );
}

export default function App({ count = 200, depth = 90 }) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
      <color attach="background" args={['white']} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }, (_, i) => (
          <Keyboard key={i} z={-(i / count) * depth - 20} />
        ))}
        <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            height={700}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
