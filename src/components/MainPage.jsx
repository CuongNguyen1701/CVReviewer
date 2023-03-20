import {
  About,
  Hero,
  StarsCanvas,
  FileInput,
  CriteriaChooser,
} from "./MainPageComponents";
import React from "react";

const MainPage = () => {
  return (
    <>
      <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
        <Hero />
      </div>
      <About />
      <CriteriaChooser />
      <div className="relative z-0">
        <FileInput />
      </div>
      <StarsCanvas />
    </>
  );
};

export default MainPage;
