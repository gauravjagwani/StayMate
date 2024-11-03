import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../redux/userSlice";
import ListingCards from "../components/ListingCards";

const PropertyList = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const propertyList = user?.propertyList;

  useEffect(() => {
    getPropertyList();
  }, []);
  const getPropertyList = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/user/${user?._id}/properties`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      dispatch(setPropertyList(data));
      //   console.log("Property Data", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Your Properties
        </h1>
        <div className="px-24 pb-28 flex justify-center flex-wrap gap-5">
          {propertyList?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              address,
              type,
              category,
              price,
              booking = false,
            }) => {
              return (
                <ListingCards
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  address={address}
                  category={category}
                  type={type}
                  price={price}
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

export default PropertyList;
