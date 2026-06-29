'use client';

import Link from 'next/link';

export default function Banner() {
  return (
    <section className="bg-gray-900 from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find Your Perfect Rental Car
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl text-sm md:text-base">
          Discover affordable, comfortable, and reliable cars for your journey.
          Book easily and travel with confidence anywhere you go.
        </p>

        <div className="mt-8">
          <Link
            href="/explore-cars"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-medium"
          >
            Explore Cars
          </Link>
        </div>
      </div>
    </section>
  );
}
