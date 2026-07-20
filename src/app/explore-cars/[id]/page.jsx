import CarDetailsClient from "@/app/CarDetailsClient/page";
import React from "react";

const CarDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`
  );

  const car = await res.json();
  console.log(car);

  return <CarDetailsClient car={car} />;
};

export default CarDetailsPage;