import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/userSlice";
import ListingCards from "../components/ListingCards";

const ReservationList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const reservationList = user?.reservationList;

  useEffect(() => {
    getReservations();
  }, []);
  const getReservations = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/${
          user?._id
        }/reservations`,
        { method: "GET" }
      );
      const data = await res.json();
      //   console.log("RESERV", data);
      dispatch(setReservationList(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Your Reservation List
        </h1>
        <div className="px-24 pb-28 flex justify-center flex-wrap gap-5">
          {reservationList?.map(
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

export default ReservationList;
