// app/page.tsx
"use client"; // Mark this file as a client component

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to food-info by default
    router.replace('/food-info');
  }, [router]);

  return null; // Redirecting, no need to render anything
};

export default HomePage;
