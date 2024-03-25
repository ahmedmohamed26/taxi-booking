import { CoordinatesContext } from "@/app/context/CoordinatesContext";
import { DestinationCoordinatesContext } from "@/app/context/DestinationCoordinatesContext";
import { UserLocationContext } from "@/app/context/UserLocationContext";
import { useContext } from "react";
import { Marker } from "react-map-gl";
function Markers() {
  const { userLocation, setUserLoaction } = useContext(UserLocationContext);
  const { addressFromCordinates, setAddressFromCordinates } =
    useContext(CoordinatesContext);
  const { addressToCordinates, setAddressToCordinates } = useContext(
    DestinationCoordinatesContext
  );

  return (
    <div>
      {!addressFromCordinates && !addressToCordinates ? (
        <Marker
          longitude={userLocation?.lng}
          latitude={userLocation?.lat}
          anchor="bottom"
        >
          <img src="images/marker.png" className="w-10 h-10" />
        </Marker>
      ) : null}

      {addressFromCordinates && addressFromCordinates?.length != 0 ? (
        <Marker
          longitude={addressFromCordinates?.lng}
          latitude={addressFromCordinates?.lat}
          anchor="bottom"
        >
          <img src="images/marker.png" className="w-10 h-10" />
        </Marker>
      ) : null}

      {addressToCordinates && addressToCordinates?.length != 0 ? (
        <Marker
          longitude={addressToCordinates?.lng}
          latitude={addressToCordinates?.lat}
          anchor="bottom"
        >
          <img src="images/marker.png" className="w-10 h-10" />
        </Marker>
      ) : null}
    </div>
  );
}

export default Markers;
