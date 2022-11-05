import { Scroll, ScrollControls } from '@react-three/drei';
import React from 'react';
import Html from '@/components/Html';
import Objects from '@/components/Objects';

function Scene() {
  return (
    <ScrollControls pages={3}>
      <Scroll>
        <Objects />
      </Scroll>
      <Scroll html>
        <Html />
      </Scroll>
    </ScrollControls>
  );
}

export { Scene };
