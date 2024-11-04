import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";
import { facilities } from "../lib/utils";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setWishList } from "../redux/userSlice";

const ListingDetails = () => {
  const { listingId } = useParams();
  const [listings, setListings] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getListingDetails();
  }, []);

  //  * FETCHING PROPERTY DETAILS
  const getListingDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/listings/${listingId}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      // console.log("DATA", data);
      setListings(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Calender
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  // console.log("LISTING DETAILS", listings);
  const customerId = useSelector((state) => state?.user?.user?._id);
  const user = useSelector((state) => state?.user?.user);
  const wishList = user?.wishList || [];
  const isAddedToWishlist = wishList.find((item) => item._id === listingId);

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listings?.creator?._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listings?.price * dayCount,
      };
      const res = await fetch("http://localhost:4000/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });

      if (res.ok) {
        console.log(res);
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // WishList

  const patchWishList = async () => {
    try {
      if (user?._id !== listings?.creator?._id) {
        const res = await fetch(
          `http://localhost:4000/api/user/${customerId}/${listingId}`,
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

  // JSX Starts Here
  return (
    <div className="mb-20">
      <Navbar />
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center flex-col gap-3 sm:items-start sm:gap-3 mb-3">
          <div className="flex items-center justify-between gap-4 w-full">
            <h1 className="md:text-2xl text-lg font-medium ">
              {listings?.title}
            </h1>
            <button
              className={`md:text-2xl text-xl bg-none ${
                isAddedToWishlist ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => {
                patchWishList(customerId, listingId);
              }}
            >
              <FaHeart />
            </button>
          </div>
          {/* Images Start here */}

          <PhotoGallery listings={listings} />
        </div>
        <h1 className="md:text-2xl text-lg font-medium">{listings?.address}</h1>
        <h3 className="text-sm md:text-base">{listings?.type}</h3>
        <p className="md:text-xl md:max-w-[1000px] max-w-[640px] text-lg mt-3 text-black/70 ">
          {listings?.guestCount} guests - {listings?.bedroomCount} bedroom(s){" "}
          {listings?.bedCount} bed(s) {listings?.bathroomCount} bathroom(s)
        </p>
        {/* Hosted By Section */}
        <hr className="my-3 border-gray-500" />
        <div className="flex items-center gap-4">
          <img
            className="w-[80px] h-[80px] object-cover rounded-full"
            src={`http://localhost:4000/${listings?.creator?.profileImage.replace(
              "public",
              ""
            )}`}
            alt="Profile Image"
          />

          <p className="md:text-xl text-lg ">
            Hosted by
            <span className=" md:text-xl ml-1 text-lg font-semibold">
              {listings?.creator?.firstName} {listings?.creator?.lastName}
            </span>
          </p>
        </div>
        <hr className="my-3 border-gray-500" />
        {/* Description */}

        <h3 className="md:text-xl text-lg  font-medium ">Description</h3>
        <p className="md:text-lg text-base mt-2">{listings?.description}</p>
        <hr className="my-3 border-gray-500" />
        {/* Perks */}
        <div className=" md:flex md:justify-between md:gap-y-0 gap-y-6 mt-5">
          <div className="flex flex-col lg:flex-row justify-between lg:gap-12">
            <div className="mt-1">
              <h3 className="text-xl font-medium ">Amenities</h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-2">
                {listings &&
                  listings?.perks.map((perk, i) => (
                    <div
                      className="flex gap-2 items-center justify-start p-2"
                      key={i}
                    >
                      <div className="md:text-3xl text-lg ">
                        {
                          facilities?.find(
                            (facility) => facility?.name === perk
                          )?.icon
                        }
                      </div>
                      <p className="font-medium text-base md:text-xl">{perk}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* Date Range Pick */}
          <div className="flex flex-col gap-3 justify-center">
            <DateRange ranges={dateRange} onChange={handleSelect} />
            {dayCount > 1 ? (
              <h2 className="mb-2.5">
                ₹{listings?.price} X {dayCount} nights
              </h2>
            ) : (
              <h2 className="mb-2.5">
                ₹{listings?.price} X {dayCount === 0 ? 1 : dayCount} night
              </h2>
            )}
            <h2 className="md:text-xl text-base font-medium text-black/90">
              Total Price: ₹ {listings?.price * (dayCount === 0 ? 1 : dayCount)}
            </h2>

            <p className="md:text-lg text-base font-normal text-black/90">
              Start Date: {dateRange[0].startDate.toDateString()}
            </p>
            <p className="md:text-lg text-base font-normal text-black/90">
              End Date: {dateRange[0].endDate.toDateString()}
            </p>
            <button
              className="w-full bg-primary md:py-3 py-2 text-white md:text-xl text-base rounded-xl hover:opacity-90 uppercase"
              type="submit"
              onClick={handleSubmit}
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
