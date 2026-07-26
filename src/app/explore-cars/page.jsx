'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars`,
      );

      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.length === 0 ? (
          <p className="text-center col-span-3">No cars found</p>
        ) : (
          cars.map(car => (
            <div
              key={car._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              {car?.imageUrl && (
                <Image
                  src={car.imageUrl}
                  alt={car?.carName || 'Car image'}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold">{car?.carName}</h2>

                <p className="text-sm text-gray-500">{car.carType}</p>

                <p
                  className={`font-semibold ${
                    car.availabilityStatus === 'Available'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {car.availabilityStatus}
                </p>

                <p>Bookings: {car.booking_count || 0}</p>

                <button
                  onClick={() => router.push(`/explore-cars/${car._id}`)}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExploreCars;
