import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
} from "@react-three/drei";

import CanvasLoader from "../MainPageComponents/Loader";
const objectName = "robot";
const MainObject = ({ isMobile }) => {
  const ref = useRef();
  const mainObject = useGLTF(`./${objectName}/scene.gltf`);
  const { actions, names, mixer } = useAnimations(mainObject.animations, ref);

  useEffect(() => {
    actions["Experiment"]?.play();
  }, [mixer]);
  const size = 2;
  const mobileSize = (70 / 75) * size;
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
        object={mainObject.scene}
        scale={isMobile ? mobileSize : size}
        position={isMobile ? [0, -3, 0] : [0, -3.25, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const MainObjectCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.3}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MainObject isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default MainObjectCanvas;
