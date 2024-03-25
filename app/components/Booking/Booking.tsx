"use client";
import React from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";

function Booking() {
  //   const screenHeight = window.innerHeight * 0.7;
  return (
    <div className="py-5">
      <h2 className="text-[20px] font-bold mb-3">Booking</h2>
      <div className="border-[1px] rounded-md p-5 mb-5">
        <AutoCompleteAddress />
        <Cars />
        <button className="w-full bg-yellow-400 p-2 rounded-md mt-4">
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
