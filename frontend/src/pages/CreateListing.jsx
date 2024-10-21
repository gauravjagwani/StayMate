import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { categoryItems, types } from "../lib/utils";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-3xl flex justify-center mb-6">
          Create Your Listing
        </h1>
        <form className="px-20 ">
          {/* Title */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Title</h2>
            <p className="text-sm opacity-80">
              Title for your place should be short and catchy as in
              advertisement
            </p>
            <input
              type="text"
              placeholder="title, for example: My lovely apt "
              className="p-2 border border-black-2 w-[30%] rounded-[25px] focus:outline-none focus:border-primary text-sm "
            />
          </div>
          {/* Address */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Address</h2>
            <p className="text-sm opacity-80">Address to this place</p>
            <input
              type="text"
              placeholder="title, for example: My lovely apt "
              className="p-2 border border-black-2 w-[30%] rounded-[25px] focus:outline-none focus:border-primary text-sm "
            />
          </div>
          {/* Select Category */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Select Category</h2>
            <p className="text-sm opacity-80">
              Select the category of the place you offer
            </p>
            <div className="flex gap-4 mt-2 flex-wrap">
              {categoryItems.map((c) => {
                return (
                  <div
                    key={c?.id}
                    className={`flex flex-col items-center justify-center mr-3 cursor-pointer border border-gray-300 w-28 h-20 rounded-lg gap-2 ${
                      category === c.title
                        ? "border-[2.5px] border-primary bg-primary bg-opacity-[0.07] transition-all ease-in"
                        : ""
                    }`}
                    onClick={() => setCategory(c.title)}
                  >
                    <img
                      src={c?.imageUrl}
                      alt={c?.name}
                      className="w-6 h-6 text-primary"
                    />
                    <p className="text-sm">{c?.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Select Type */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Select Type</h2>
            <p className="text-sm opacity-80">
              Select the type of the place you offer
            </p>
            <div className="flex flex-col gap-4 mt-2">
              {types.map((c) => {
                return (
                  <div
                    key={c?.id}
                    className={`flex flex-col justify-start mr-3 cursor-pointer border border-gray-300 w-[60%] h-20 rounded-lg gap-2 ${
                      type === c.title
                        ? "border-[2.5px] border-primary bg-primary bg-opacity-[0.07] transition-all ease-in"
                        : ""
                    }`}
                    onClick={() => setType(c.title)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1.5 py-3 px-3 leading-tight">
                        <p className="text-base font-semibold">{c?.title}</p>
                        <p className="text-sm">{c?.description}</p>
                      </div>
                      <div className="px-2">{c.icon}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
