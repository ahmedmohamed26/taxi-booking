import { CoordinatesContext } from "@/app/context/CoordinatesContext";
import { DestinationCoordinatesContext } from "@/app/context/DestinationCoordinatesContext";
import { useContext, useState } from "react";
const { v4: uuidv4 } = require("uuid");

function AutoCompleteAddress() {
  const [addressTo, setAddressTo] = useState<any>();
  const [addressFrom, setAddressFrom] = useState<any>();
  const [addressToList, setAddressToList] = useState<any>();
  const [addressFromList, setAddressFromList] = useState<any>();
  const { addressFromCordinates, setAddressFromCordinates } =
    useContext(CoordinatesContext);
  const { addressToCordinates, setAddressToCordinates } = useContext(
    DestinationCoordinatesContext
  );
  const searchAddressToList = async () => {
    const res = await fetch("/api/search-address?q=" + addressTo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setAddressToList(result);
  };
  const searchAddressFromList = async () => {
    const res = await fetch("/api/search-address?q=" + addressFrom, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setAddressFromList(result);
  };

  const addressFromClick = async (item: any) => {
    setAddressFrom(item.name);
    setAddressFromList([]);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAPBOX_BASEURL}retrieve/${
        item.mapbox_id
      }?session_token=${JSON.stringify(uuidv4().id)}&access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }`
    );
    const result = await res.json();
    setAddressFromCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const addressToClick = async (item: any) => {
    setAddressTo(item.name);
    setAddressToList([]);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAPBOX_BASEURL}retrieve/${
        item.mapbox_id
      }?session_token=${JSON.stringify(uuidv4().id)}&access_token=${
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
      }`
    );
    const result = await res.json();
    setAddressToCordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div className=" relative">
      <div className="mt-5">
        <label className="text-gray-400">Where From ?</label>
        <input
          className="bg-white border-[1px] p-1 rounded-md w-full mt-3 outline-none"
          onChange={(e) => {
            setAddressFrom(e.target.value);
            searchAddressFromList();
          }}
          value={addressFrom}
        />
        {addressFromList?.suggestions ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10">
            {addressFromList?.suggestions?.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  addressFromClick(item);
                }}
              >
                {item?.name}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-4 ">
        <label className="text-gray-400">Where To ?</label>
        <input
          className="bg-white border-[1px] p-1 rounded-md w-full mt-3 outline-none"
          onChange={(e) => {
            setAddressTo(e.target.value);
            searchAddressToList();
          }}
          value={addressTo}
        />
        {addressToList?.suggestions ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10">
            {addressToList?.suggestions?.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  addressToClick(item);
                }}
              >
                {item?.name}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AutoCompleteAddress;
