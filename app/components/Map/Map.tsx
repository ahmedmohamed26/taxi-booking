"use client";
import { UserLocationContext } from "@/app/context/UserLocationContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useRef } from "react";
import { Map } from "react-map-gl";
import Markers from "./Markers";
import { DestinationCoordinatesContext } from "@/app/context/DestinationCoordinatesContext";
import { CoordinatesContext } from "@/app/context/CoordinatesContext";
import { DirectionContext } from "@/app/context/DirectionContext";
import MabBoxRoute from "./MabBoxRoute";
import DistanceTime from "./DistanceTime";

const drawRouteBaseUrl = "https://api.mapbox.com/directions/v5/mapbox/driving/";

function MapboxMap() {
  const mapRef = useRef<any>();
  const { userLocation, setUserLoaction } = useContext(UserLocationContext);
  const { addressFromCordinates, setAddressFromCordinates } =
    useContext(CoordinatesContext);
  const { addressToCordinates, setAddressToCordinates } = useContext(
    DestinationCoordinatesContext
  );

  const { directionRoute, setDirectionRoute } = useContext(DirectionContext);

  useEffect(() => {
    if (addressFromCordinates) {
      mapRef?.current?.flyTo({
        center: [addressFromCordinates.lng, addressFromCordinates.lat],
        duration: 2500,
      });
    }
  }, [addressFromCordinates]);
  useEffect(() => {
    if (addressToCordinates) {
      mapRef?.current?.flyTo({
        center: [addressToCordinates.lng, addressToCordinates.lat],
        duration: 2500,
      });
    }
    if (addressFromCordinates && addressToCordinates) {
      getDirectionRoute();
    }
  }, [addressToCordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      `${drawRouteBaseUrl}${addressFromCordinates.lng},${addressFromCordinates.lat};${addressToCordinates.lng},${addressToCordinates.lat}?geometries=geojson&overview=full&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setDirectionRoute(result);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-bold mb-3">Map</h2>
      <div className="rounded-lg overflow-hidden relative">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              latitude: userLocation?.lat,
              longitude: userLocation?.lng,
              zoom: 12,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionRoute?.routes ? (
              <MabBoxRoute
                coordinates={directionRoute?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
        <div className="absolute bottom-[0] z-20 right-[0] hidden md:block">
          <DistanceTime />
        </div>
      </div>
    </div>
  );
}

export default MapboxMap;
