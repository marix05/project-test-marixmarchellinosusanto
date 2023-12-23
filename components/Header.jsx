"use client";
import React, { useState, useEffect } from "react";

// components
import Logo from "./Logo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import ThemeToggler from "./ThemeToggler";

function Header() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [header, setHeader] = useState(true);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setHeader(true);
      } else {
        setHeader(false);
        if (currentScrollY > prevScrollY) {
          // Scrolling down
          setHeaderVisible(false);
        } else {
          // Scrolling up
          setHeaderVisible(true);
        }
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${!headerVisible ? "top-[-100%]" : "top-0"} ${
        header ? "bg-primary" : "bg-primary/85 shadow-lg"
      } sticky z-30 transition-all duration-500 py-6 min-h-[6rem]`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            <Nav
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative text-primary-foreground transition-all py-2"
              underlineStyle="absolute left-0 top-full h-[4px] bg-white w-full"
            />
            <ThemeToggler />
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
