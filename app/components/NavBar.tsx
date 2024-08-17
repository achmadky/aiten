// components/NavBar.tsx
"use client"; // Ensure this file is a client component

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700 fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/food-info"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white text-lg font-semibold"
            >
              Food Info
            </Link>
          </li>
          <li>
            <Link
              href="/calorie-tracker"
              className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white text-lg font-semibold"
            >
              Calorie Tracker
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
