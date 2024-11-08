import React from "react";

const ShimmerListing = () => {
  return (
    <div className=" relative flex flex-col gap-2 cursor-pointer p-2.5 rounded-lg hover:shadow-lg">
      <div className=" w-[320px] h-[302px] overflow-hidden rounded-lg mb-2.5">
        <div className="flex w-full h-full items-center">
          <div className="relative flex-none w-full h-full flex items-center">
            <div className=" w-full h-full bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 animate-pulse"></div>
      <div className="bg-gray-300 animate-pulse"></div>
      <div className="bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default ShimmerListing;
