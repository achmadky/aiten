"use client";
import NavBar from '@/components/NavBar';

import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <NavBar/>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
