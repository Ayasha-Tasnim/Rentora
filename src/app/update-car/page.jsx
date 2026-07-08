'use client';

import { useEffect, useState, use } from 'react';

const UpdateCar = ({ params }) => {
  const { id } = use(params);

  const [form, setForm] = useState({
    carName: '',
    dailyRentPrice: '',
    carType: '',
    imageUrl: '',
    seatCapacity: '',
    pickupLocation: '',
    description: '',
    availabilityStatus: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`,
        );
        const data = await res.json();

        setForm({
          carName: data?.carName || '',
          dailyRentPrice: data.dailyRentPrice || '',
          carType: data?.carType || '',
          imageUrl: data.imageUrl || '',
          seatCapacity: data.seatCapacity || '',
          pickupLocation: data.pickupLocation || '',
          description: data.description || '',
          availabilityStatus: data.availabilityStatus || 'Available',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadCar();
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Car updated successfully');
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Car</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="carName"
          value={form.carName}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="dailyRentPrice"
          value={form.dailyRentPrice}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="carType"
          value={form.carType}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="seatCapacity"
          value={form.seatCapacity}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="availabilityStatus"
          value={form.availabilityStatus}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
