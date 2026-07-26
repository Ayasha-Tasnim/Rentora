import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-red-500">
            Please login first
          </h1>
          <p className="text-gray-500">
            You need an account to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  let data = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user.id}`,
      {
        cache: 'no-store',
      },
    );

    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          My Bookings 
        </h1>
        <p className="text-gray-500 mt-1">
          View all your booked cars in one place
        </p>
      </div>

      {data?.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-700">
            No bookings found
          </h2>
          <p className="text-gray-500 mt-1">
            Start booking your favorite cars now 🚘
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map(booking => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {booking?.carName}
            </h2>

            <p className="text-blue-600 font-semibold mt-2">
              ${booking.price} / day
            </p>

            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p> Pickup: {booking.pickupLocation}</p>
              <p>
              Driver:{' '}
                <span className="font-medium">{booking.driverNeeded}</span>
              </p>
              <p>
                AC:{' '}
                <span className="font-medium">{booking.ACNeeded}</span>
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-500 border-t pt-3">
              {new Date(booking.bookingDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
