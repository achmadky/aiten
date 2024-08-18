// components/NavBar.tsx
"use client"; // Ensure this file is a client component

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-300 dark:border-neutral-700 shadow-md fixed top-0 left-0 w-full z-20 rounded-b-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/food-info"
              className="relative group text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            >
              <span className="text-lg font-semibold">Food Info</span>
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-neutral-900 dark:bg-neutral-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </li>
          <li>
            <Link
              href="/calorie-counter"
              className="relative group text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            >
              <span className="text-lg font-semibold">Calorie Counter</span>
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-neutral-900 dark:bg-neutral-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </li>
          <li>
          <Link
              href="/dashboard"
              className="relative group text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
            >
              <span className="text-lg font-semibold">Dashboard</span>
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-neutral-900 dark:bg-neutral-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
