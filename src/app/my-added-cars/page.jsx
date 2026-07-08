'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

const MyCarsPage = () => {
  const { data: session } = authClient.useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      if (!session?.user?.email) return;

      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-added-cars/${session.user.email}`,
        );

        const data = await res.json();

        setCars(data || []);
      } catch (error) {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [session]);

  const handleDelete = id => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/car/${deleteId}`,
      {
        method: 'DELETE',
      },
    );

    if (res.ok) {
      setCars(prev => prev.filter(car => car._id !== deleteId));

      setShowModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Added Cars</h1>

      {loading && <p className="text-gray-500">Loading cars...</p>}

      {!loading && cars.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No car added yet</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car._id} className="border rounded p-4 shadow">
            {car?.imageUrl && (
              <Image
                src={car.imageUrl}
                alt={car?.carName || 'Car image'}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}

            <h2 className="text-xl font-semibold mt-2">{car?.carName}</h2>

            <p>Price: ${car.dailyRentPrice}</p>
            <p>Type: {car?.carType}</p>
            <p>Location: {car.pickupLocation}</p>

            <div className="flex gap-4 mt-3">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() =>
                  (window.location.href = `/update-car/${car._id}`)
                }
              >
                Update
              </button>

              <button
                className="bg-red-600 text-black border px-3 py-1 rounded"
                onClick={() => handleDelete(car._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>

            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1 border"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1  text-black border"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCarsPage;
