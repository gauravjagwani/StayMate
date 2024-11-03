import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { setTripList } from "../redux/userSlice";
import ListingCards from "../components/ListingCards";

const TripList = () => {
  const userId = useSelector((state) => state?.user?.user?._id);
  const tripList = useSelector((state) => state?.user?.user?.tripList);

  console.log();
  const dispatch = useDispatch();

  useEffect(() => {
    getTripList();
  }, []);

  const getTripList = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/user/${userId}/trips`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
      dispatch(setTripList(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Your Trips
        </h1>
        <div className="px-24 pb-28 flex justify-center flex-wrap gap-5">
          {tripList?.map(
            ({
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => {
              return (
                <ListingCards
                  listingId={listingId._id}
                  creator={hostId._id}
                  listingPhotoPaths={listingId.listingPhotoPaths}
                  address={listingId.address}
                  category={listingId.category}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice}
                  booking={booking}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default TripList;
