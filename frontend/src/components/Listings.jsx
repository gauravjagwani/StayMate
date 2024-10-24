import React, { useEffect, useState } from "react";
import { categoryItems } from "../lib/utils";
import { useDispatch } from "react-redux";
import { setListings } from "../redux/listingSlice";
import { useSelector } from "react-redux";
import ListingCards from "./ListingCards";

const Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { listings } = useSelector((state) => state.listings);
  console.log(listings);
  const dispatch = useDispatch();
  const handleSelectCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    getListings();
  }, [selectedCategory]);

  // * Fetch Lisitings from API on bases of categories
  const getListings = async () => {
    try {
      const res = await fetch(
        selectedCategory !== ""
          ? `http://localhost:4000/api/listings?category=${selectedCategory}`
          : `http://localhost:4000/api/listings`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      dispatch(setListings({ listings: data }));
    } catch (err) {}
  };
  return (
    <div>
      {/* Category Navigator */}
      <div className=" gap-1 md:gap-6 px-10 py-10 flex justify-center items-center flex-wrap">
        {categoryItems.map((cat) => (
          <div
            key={cat?.id}
            className={`p-1 md:p-3 flex flex-col items-center gap-2 opacity-70 cursor-pointer ${
              selectedCategory === cat?.title
                ? "border-b-[3px] border-b-primary opacity-100 text-primary transition-all ease-out"
                : ""
            }`}
            onClick={() => handleSelectCategory(cat?.title)}
          >
            <img src={cat?.imageUrl} alt={cat?.name} className="w-8 h-8 " />
            <div className="text-sm">{cat?.title}</div>
          </div>
        ))}
      </div>

      {/* Lisitng Cards */}
      <div className="px-12 pb-32 lg:px-5 flex flex-wrap justify-center gap-5">
        {listings.length > 0 &&
          listings.map((list, index, booking = false) => (
            <ListingCards key={index} list={list} booking />
          ))}
      </div>
    </div>
  );
};

export default Listings;
