import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../MainPageComponents/Loader";

const Gear = ({ loading }) => {
  const ref = useRef();
  const Gear = useGLTF("./gear/scene.gltf");
  useFrame((state, delta) => {
    let speed = 5;
    ref.current.rotation.x += delta * speed * loading;
    // (ref.current.rotation.x + (delta/10)*(Math.PI/180)) % (2*Math.PI);
  });
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />

      <spotLight
        position={[-20, 50, 10]} //[x,y,z]
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        ref={ref}
        object={Gear.scene}
        scale={1 /* (1 + loading * 0.2)*/}
        rotation-z={Math.PI / 2}
      />
    </mesh>
  );
};

const GearCanvas = ({ loading }) => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.4}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Gear loading={loading} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default GearCanvas;
