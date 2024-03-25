import { DirectionContext } from "@/app/context/DirectionContext";
import React, { useContext } from "react";

function DistanceTime() {
  const { directionRoute, setDirectionRoute } = useContext(DirectionContext);
  return (
    directionRoute?.routes && (
      <div className="bg-yellow-500 p-3">
        <h2 className="text-yellow-100 opacity-80 text-[15px]">
          Distance:
          <span className="font-bold ml-3 text-black">
            {(directionRoute?.routes[0].distance * 0.000621371192).toFixed(2)}{" "}
            Miles
          </span>
        </h2>
        <h2 className="text-yellow-100 opacity-80 text-[15px]">
          Duration:
          <span className="font-bold ml-3 text-black">
            {(directionRoute?.routes[0].duration / 60).toFixed(2)} Min
          </span>
        </h2>
      </div>
    )
  );
}

export default DistanceTime;
