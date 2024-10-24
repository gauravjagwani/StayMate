import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListingCards = ({ list, booking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { _id, listingPhotoPaths, title, category, type, price, address } =
    list;
  console.log("Photolist", listingPhotoPaths);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  return (
    <div
      className=" relative cursor-pointer p-2.5 rounded-lg hover:shadow-lg"
      onClick={() => navigate(`/listings/${_id}`)}
    >
      <div className=" w-[320px] h-[302px] overflow-hidden rounded-lg mb-2.5 border border-black">
        <div
          className="flex w-full h-full items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths.map((photo, index) => {
            return (
              <div
                className="relative flex-none w-full h-full flex items-center"
                key={index}
              >
                <img
                  src={`http://localhost:4000/${photo.replace("public", "")}`}
                  alt=""
                  className="w-full h-full brightness-90"
                />

                <div
                  className="absolute top-1/2 transform -translate-y-1/2 p-1.5 rounded-full border-none cursor-pointer
                 flex items-center justify-center bg-white/70 z-50 hover:bg-white right-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevSlide(e);
                  }}
                >
                  <FaArrowRight className="font-[15px] " />
                </div>
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 p-1.5 rounded-full border-none cursor-pointer
                 flex items-center justify-center bg-white/70 z-50 hover:bg-white left-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextSlide(e);
                  }}
                >
                  <FaArrowLeft className="font-[15px] " />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h3 className="text-[17px] font-semibold">{address}</h3>
      <p className="text-[14px] text-black/60">{category}</p>
      <p className="text-[14px] text-black/60">{type}</p>
      <p className="text-[14px] font-semibold">
        &#8377;{price}
        <span className="text-[14px] font-normal "> night</span>
      </p>
    </div>
  );
};

export default ListingCards;
