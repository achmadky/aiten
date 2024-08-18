"use client";
import NavBar from '@/components/NavBar';

import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
              <NavBar/>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
