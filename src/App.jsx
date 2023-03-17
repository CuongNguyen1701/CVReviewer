import { BrowserRouter } from "react-router-dom";

import {
  About,
  Hero,
  Navbar,
  StarsCanvas,
  Dropzone,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        {/* <Education /> */}
        {/* <Experience /> */}
        {/* <Tech /> */}
        {/* <Works /> */}
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          <Dropzone />
        </div>
          <StarsCanvas />
        {/* <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
