import { About, Hero, StarsCanvas, FileInput } from "./MainPageComponents";
import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <About />
      <div className="relative z-0">
        <FileInput />
      </div>
      <StarsCanvas />
    </>
  );
};

export default MainPage;
