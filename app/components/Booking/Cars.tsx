import { DirectionContext } from "@/app/context/DirectionContext";
import CarsList from "../../data/CarsList";
import Image from "next/image";
import React, { useContext, useState } from "react";

function Cars() {
  const { directionRoute, setDirectionRoute } = useContext(DirectionContext);

  const [selectedCar, setSelectedCar] = useState<number>();

  const getCost = (charges: number) => {
    return (
      charges *
      directionRoute?.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };
  return (
    <div className="mt-4">
      <h2 className="font-semobold">Select Car</h2>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-2 mt-4">
        {CarsList.map((car: any, index: number) => (
          <div
            key={index}
            className={`p-5  border-[2px] rounded-md hover:border-yellow-400 ${
              selectedCar == index ? "border-[2px] border-yellow-400" : null
            }`}
            onClick={() => setSelectedCar(index)}
          >
            <div className="w-full h-[80px] relative">
              <Image
                src={car.image}
                alt={car.name}
                fill={true}
                className="w-full cursor-pointer"
              />
            </div>
            <h2 className="mt-3 text-gray-400">
              {car.name}
              {directionRoute?.routes ? (
                <span className="float-right text-black">
                  {getCost(car.charges)}$
                </span>
              ) : null}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
