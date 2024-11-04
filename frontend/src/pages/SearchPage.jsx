import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ListingCards from "../components/ListingCards";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/listingSlice";

const SearchPage = () => {
  const { search } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state?.listings?.listings);

  console.log("LISTINGS", listings);
  useEffect(() => {
    getSearchResult();
  }, [search]);
  const getSearchResult = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/listings/search/${search}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Results for : {search}
        </h1>
        <div className="px-24 pb-28 flex justify-center flex-wrap gap-5">
          {listings?.map(
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

export default SearchPage;
