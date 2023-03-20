import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar, MainPage, Login } from "./components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
