'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        console.log('SERVER URL:', process.env.NEXT_PUBLIC_SERVER_URL);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/explore-cars`,
        );
        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Data:', data);
        setCars(data || []);
      } catch (error) {
         console.error('Fetch Error:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const visibleCars = cars.slice(0, 6);

  const CarCard = ({ car }) => (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border">
      <div className="overflow-hidden">
        <Image
          src={car.imageUrl}
          alt={car.carName}
          width={500}
          height={300}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-800">{car.carName}</h3>

        <p className="text-sm text-gray-500">  {car.carType}</p>

        <p className="text-sm text-gray-500"> ${car.dailyRentPrice}/day</p>

        <p className="text-sm text-gray-500"> {car.pickupLocation}</p>

        <p
          className={`text-sm font-semibold ${
            car.availabilityStatus === 'Available'
              ? 'text-green-600'
              : 'text-red-500'
          }`}
        >
          {car.availabilityStatus}
        </p>

        <Link href={`/explore-cars/${car._id}`}>
          <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Available Cars</h2>

      {loading && <p className="text-gray-500 text-center">Loading cars...</p>}

      {!loading && visibleCars.length === 0 && (
        <p className="text-gray-500 text-center">No cars available</p>
      )}

      {!loading && visibleCars.length > 0 && (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {visibleCars.map(car => (
            <SwiperSlide key={car._id}>
              <CarCard car={car} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default AvailableCars;
