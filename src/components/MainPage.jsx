import { About, Hero, StarsCanvas, FileInput } from "./MainPageComponents";
import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
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
