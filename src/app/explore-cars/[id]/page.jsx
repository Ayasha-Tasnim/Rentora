import CarDetailsClient from '@/app/CarDetailsClient/page';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const CarDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const car = await res.json();
  console.log(car);

  return <CarDetailsClient car={car} />;
};

export default CarDetailsPage;
