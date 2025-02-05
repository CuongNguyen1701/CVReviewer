import React, { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notHome, setNotHome] = useState(false);
  const currentPath = useLocation().pathname;
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full mx-auto select-none max-w-7xl">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="object-contain w-9 h-9" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            DreamFlare &nbsp;
            <span className="hidden sm:block"> | NeuralCV</span>
          </p>
        </Link>
        {isLoggedIn ? (
          <>
            Logged in
            <Link to="/">
              <button
                className="flex flex-row w-fit h-auto green-pink-gradient px-8 py-2
                      rounded-[10px] select-none self-end
                      hover:bg-gradient-to-b from-green-300 to-purple-400 hover:text-black"
                onClick={handleLogout}
              >
                Log out
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            {currentPath !== "/login" && (
              <button
                className="flex flex-row w-fit h-auto green-pink-gradient px-8 py-2
                      rounded-[10px] shadow-card select-none self-end
                      hover:bg-gradient-to-b from-green-300 to-purple-400 hover:text-black"
              >
                Log in
              </button>
            )}
          </Link>
        )}
        <ul className="flex-row hidden gap-10 list-none sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => {
                setActive(nav.title);
                // if (currentPath !== "/") {
                //   setNotHome(true);
                // } else {
                //   setNotHome(false);
                // }
              }}
            >
              {currentPath !== "/" ? (
                <Link to={`/#${nav.id}`}>{nav.title}</Link>
              ) : (
                <a href={`#${nav.id}`}>{nav.title}</a>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end flex-1 sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="flex flex-col items-start justify-end flex-1 gap-4 list-none">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  {currentPath !== "/" ? (
                    <Link to={`/#${nav.id}`}>{nav.title}</Link>
                  ) : (
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
