import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useId } from "react";
import { Navbar, MainPage, Login, UserAuthenticate } from "./components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useId;
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
          <Route
            path="/user/auth/:id"
            element={<UserAuthenticate setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
