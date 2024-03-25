"use client";
import { useEffect, useState } from "react";
import Booking from "./components/Booking/Booking";
import MapboxMap from "./components/Map/Map";
import { UserLocationContext } from "./context/UserLocationContext";
import { CoordinatesContext } from "./context/CoordinatesContext";
import { DestinationCoordinatesContext } from "./context/DestinationCoordinatesContext";
import { DirectionContext } from "./context/DirectionContext";

export default function Home() {
  const [userLocation, setUserLoaction] = useState<any>();
  const [addressFromCordinates, setAddressFromCordinates] = useState<any>();
  const [addressToCordinates, setAddressToCordinates] = useState<any>();
  const [directionRoute, setDirectionRoute] = useState<any>();
  useEffect(() => {
    getUserLoaction();
  }, []);

  const getUserLoaction = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLoaction({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLoaction }}>
        <CoordinatesContext.Provider
          value={{ addressFromCordinates, setAddressFromCordinates }}
        >
          <DestinationCoordinatesContext.Provider
            value={{ addressToCordinates, setAddressToCordinates }}
          >
            <DirectionContext.Provider
              value={{ directionRoute, setDirectionRoute }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-5">
                <div>
                  <Booking />
                </div>
                <div className="col-span-2 order-first md:order-last ">
                  <MapboxMap />
                </div>
              </div>
            </DirectionContext.Provider>
          </DestinationCoordinatesContext.Provider>
        </CoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
