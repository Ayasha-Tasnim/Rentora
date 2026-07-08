'use client';

import React, { useState } from 'react';

import { authClient } from '@/lib/auth-client';

const AddCar = () => {
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();

  const [form, setForm] = useState({
    carName: '',
    dailyRentPrice: '',
    carType: '',
    imageUrl: '',
    seatCapacity: '',
    pickupLocation: '',
    description: '',
    availabilityStatus: 'Available',
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!session?.user) {
      alert('Please login first');
      return;
    }

    setLoading(true);

    try {
      const carData = {
        ...form,
        userEmail: session.user.email,
        userName: session.user.name,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(carData),
      });

      const data = await res.json();

      console.log('Response:', data);

      if (res.ok) {
        alert('Car added successfully!');

        setForm({
          carName: '',
          dailyRentPrice: '',
          carType: '',
          imageUrl: '',
          seatCapacity: '',
          pickupLocation: '',
          description: '',
          availabilityStatus: 'Available',
        });
      } else {
        alert('Failed to add car');
      }
    } catch (error) {
      console.error('Error:', error);

      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Car</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="carName"
          placeholder="Car Name"
          value={form.carName}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="dailyRentPrice"
          placeholder="Daily Rent Price ($)"
          value={form.dailyRentPrice}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <select
          name="carType"
          value={form.carType}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Car Type</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="seatCapacity"
          placeholder="Seat Capacity"
          value={form.seatCapacity}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={form.pickupLocation}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Car Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows="4"
        />

        <select
          name="availabilityStatus"
          value={form.availabilityStatus}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading ? 'Adding Car...' : 'Add Car'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
