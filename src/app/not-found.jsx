import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-5 max-w-md">
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Oops! Page not found
        </h2>

        <p className="text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link href="/">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow-md">
            ⬅ Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
