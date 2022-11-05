import React from 'react';

export default function Html() {
  return (
    <>
      <h1
        style={{
          position: 'absolute',
          top: '50vh',
          left: '50vw',
          transform: 'translateX(-50%)',
          color: '#292828',
        }}
      >
        Hello.
      </h1>
      <h1
        style={{
          position: 'absolute',
          top: '140vh',
          left: '50vw',
          transform: 'translateX(-50%)',
          color: '#f4b677',
        }}
      >
        Information
      </h1>
      <h1
        style={{
          position: 'absolute',
          top: '250vh',
          left: '50vw',
          transform: 'translateX(-50%)',
          color: '#673ab7',
        }}
      >
        Footer
      </h1>
    </>
  );
}
