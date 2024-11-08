import React from "react";

const ShimmerImage = () => {
  return (
    <div className="md:grid md:grid-cols-4 md:auto-rows-[300px] md:gap-2 relative w-full h-full">
      <div
        className={`rounded-2xl object-cover bg-gray-300 w-full h-full row-span-2 col-span-2 animate-pulse`}
      ></div>
      <div
        className={`rounded-2xl object-cover bg-gray-300 w-full h-full animate-pulse`}
      ></div>
      <div
        className={`rounded-2xl object-cover bg-gray-300 w-full h-full animate-pulse`}
      ></div>
      <div
        className={`rounded-2xl object-cover bg-gray-300 w-full h-full animate-pulse`}
      ></div>
      <div
        className={`rounded-2xl object-cover bg-gray-300 w-full h-full animate-pulse`}
      ></div>
    </div>
  );
};

export default ShimmerImage;
