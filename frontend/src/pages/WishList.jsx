import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCards from "../components/ListingCards";
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state?.user?.user?.wishList);
  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Your WishList
        </h1>
        <div className="px-24 pb-28 flex justify-center flex-wrap gap-5">
          {wishList?.map(
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
      <Footer />
    </div>
  );
};

export default WishList;
