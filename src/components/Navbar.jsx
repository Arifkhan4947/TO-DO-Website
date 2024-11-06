import React from 'react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';
import menu from '../assets/menu.png';
import moon_img from '../assets/moon_img.png';
import sun_img from '../assets/sun_img.png';
import app_grid from '../assets/app_grid.png';
import search from '../assets/search.png';

const Navbar = ({ toggleSidebar, isOpen }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="border-b dark:border-gray-700 bg-white dark:bg-[#1A1D1B] fixed w-full top-0 z-50">
      <div className="max-w-[1344px] h-[56px] flex items-center justify-between mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <img src={menu} alt="" className="w-6 h-6 dark:invert" />
          </button>
          <img src={logo} alt="logo" className="h-8 dark:invert" />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <img src={search} alt="search" className="w-6 h-6 dark:invert" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <img src={app_grid} alt="grid" className="w-6 h-6 dark:invert" />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isDarkMode ? (
              <img src={sun_img} alt="light mode" className="w-6 h-6" />
            ) : (
              <img src={moon_img} alt="dark mode" className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;