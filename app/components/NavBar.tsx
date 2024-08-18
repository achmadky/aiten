"use client"; // Ensure this file is a client component

import Link from 'next/link';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}` // Pass token in Authorization header
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' }); // Call the logout API
      localStorage.removeItem('token'); // Clear token from localStorage
      setUser(null); // Clear user state
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4 text-neutral-700 dark:text-neutral-300">
              <span className="font-semibold">{user.username}</span>
              <span className="text-sm">{user.email}</span>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
