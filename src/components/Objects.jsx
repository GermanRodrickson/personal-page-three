import { useIntersect, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';

function Keyboard({ position, movement = false, fullRotate = false }) {
  const visible = useRef();
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { nodes, materials } = useGLTF('/keyboard-v1-transformed.glb');
  const [xRandomFactor, yRandomFactor] = useMemo(
    () => [(1 - Math.random()) * 1, (1 - Math.random()) * 1],
    []
  );

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (movement) {
      ref.current.rotation.x = elapsedTime * xRandomFactor;
      ref.current.rotation.y = elapsedTime * yRandomFactor;
    }

    if (fullRotate) {
      if (ref.current.rotation.y >= 3.1) {
        ref.current.rotation.y = 3.1;
      } else {
        ref.current.rotation.y += 0.004;
      }

      if (ref.current.position.z > 3) {
        ref.current.position.z = 3;
      } else {
        ref.current.position.z += 0.0025;
      }
    }
  });

  return (
    <group ref={ref} position={position} dispose={null}>
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

export default function Objects() {
  const { height, width } = useThree((state) => state.viewport);

  return (
    <>
      <Keyboard></Keyboard>
      <Keyboard movement position={[width / 6, -height * 1, 0]}></Keyboard>
      <Keyboard fullRotate position={[0, -height * 2, 1.5]}></Keyboard>
    </>
  );
}
