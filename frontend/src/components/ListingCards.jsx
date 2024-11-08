import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { setWishList } from "../redux/userSlice";
import ShimmerListing from "./ShimmerListing";

const ListingCards = ({
  listingId,
  creator,
  listingPhotoPaths,
  address,
  category,
  type,
  price,
  booking,
  startDate,
  endDate,
  totalPrice,
  isLoading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  // WishList

  const wishList = user?.wishList || [];
  const userId = user?._id;
  const isAddedToWishlist = wishList.find((item) => item._id === listingId);

  const patchWishList = async () => {
    try {
      if (user?._id !== creator._id) {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/${
            user?._id
          }/${listingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "appilication/json",
            },
          }
        );
        const data = await res.json();
        dispatch(setWishList(data?.wishList));
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (!isLoading) {
    return (
      <div
        className=" relative cursor-pointer p-2.5 rounded-lg hover:shadow-lg"
        onClick={() => navigate(`/listings/${listingId}`)}
      >
        <div className=" w-[320px] h-[302px] overflow-hidden rounded-lg mb-2.5">
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
                    src={photo}
                    alt=""
                    className="w-full h-full brightness-90"
                  />

                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 p-1.5 rounded-full border-none cursor-pointer
                   flex items-center justify-center bg-white/70 z-30 hover:bg-white right-2.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevSlide(e);
                    }}
                  >
                    <FaArrowRight className="font-[15px] " />
                  </div>
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 p-1.5 rounded-full border-none cursor-pointer
                   flex items-center justify-center bg-white/70 z-30 hover:bg-white left-2.5"
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
        {!booking ? (
          <p className="text-[14px] font-semibold">
            &#8377;{price}
            <span className="text-[14px] font-normal "> night</span>
          </p>
        ) : (
          <>
            <p className="text-[14px] font-medium">
              {startDate} - {endDate}
            </p>
            <p className="text-[14px] font-semibold">&#8377;{totalPrice}</p>
          </>
        )}
        <button
          className={`absolute top-5 right-5 z-[999] text-xl ${
            isAddedToWishlist ? "text-red-600" : "text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            patchWishList();
          }}
        >
          <FaHeart />
        </button>
      </div>
    );
  } else {
    return <ShimmerListing />;
  }
};

export default ListingCards;
