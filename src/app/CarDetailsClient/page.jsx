'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CarDetailsClient = ({ car }) => {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  
 const [form, setForm] = useState({
   driverNeeded: 'no',
   ACNeeded: 'no',
   note: '',
 });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    try {
      if (!user) {
        alert('Please login first');
        return;
      }

      const bookingData = {
        userId: user.id,
        carId: car._id,
        carName: car.carName,
        price: car.dailyRentPrice,
        pickupLocation: car.pickupLocation,
        driverNeeded: form.driverNeeded,
        ACNeeded: form.ACNeeded,
        note: form.note,
        bookingDate: new Date().toISOString(),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error('Booking failed');

      alert('Booking successful ');
      toast('Booking successful');

      setForm({
        driverNeeded: 'no',
        ACNeeded: 'no',
        note: '',
      });

      setOpen(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {car?.imageUrl && (
            <Image
              src={car.imageUrl}
              alt={car?.carName || 'Car image'}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
          )}
        </div>

        <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {car?.carName}
          </h1>

          <div className="space-y-1 text-gray-700">
            <p>
              Type: <b>{car?.carType}</b>
            </p>
            <p>
            Price: <b>${car?.dailyRentPrice}/day</b>
            </p>
            <p>
             Seats: <b>{car?.seatCapacity}</b>
            </p>
            <p>
             Location: <b>{car?.pickupLocation}</b>
            </p>
          </div>

          <p
            className={`font-semibold ${
              car?.availabilityStatus === 'Available'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {car?.availabilityStatus}
          </p>

          <p className="text-gray-600 text-sm">{car?.description}</p>

          <button
            disabled={car?.availabilityStatus !== 'Available'}
            onClick={() => setOpen(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            Book Now
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-md p-5 sm:p-6 rounded-2xl space-y-4 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              Book This Car
            </h2>

            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <b>Car:</b> {car?.carName}
              </p>
              <p>
                <b>Price:</b> ${car?.dailyRentPrice}/day
              </p>
              <p>
                <b>Pickup:</b> {car?.pickupLocation}
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1">Driver Needed</label>

              <select
                name="driverNeeded"
                value={form.driverNeeded}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">AC Needed</label>

              <select
                name="ACNeeded"
                value={form.ACNeeded}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Special Note</label>

              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Write something..."
                className="w-full border p-2 rounded-lg"
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleBooking}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsClient;
