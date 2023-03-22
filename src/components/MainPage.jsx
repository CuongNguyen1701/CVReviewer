import { About, Hero, StarsCanvas, FileInput } from "./MainPageComponents";
import React, { useState } from "react";

const MainPage = () => {
  const [responseData, setResponseData] = useState(null);
  const updateResponse = (data) => {
    setResponseData(data);
  };
  return (
    <>
      <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
        <Hero />
      </div>
      <div className="relative z-0">
        <FileInput updateResponse={updateResponse} />
        {responseData && <div>This is the result</div>}
      </div>
      <About />
      <StarsCanvas />
    </>
  );
};

export default MainPage;
