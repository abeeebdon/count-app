import React from "react";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className=" flex items-center justify-between p-6">
      <h2 className="text-lg ">Where in the world?</h2>
      <div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
