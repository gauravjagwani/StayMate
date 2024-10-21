import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { categoryItems, facilities, types } from "../lib/utils";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [perks, setPerks] = useState([]);

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  const [formAddress, setFormAddress] = useState("");
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });
  console.log(formDescription);

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const handleSelectPerks = (perk) => {
    if (perks.includes(perk)) {
      setPerks((prev) => perks.filter((option) => option !== perk));
    } else {
      setPerks((prev) => [...prev, perk]);
    }
  };

  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Create Your Listing
        </h1>
        <form className="px-20 flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Title</h2>
            <p className="text-sm opacity-80">
              Title for your place should be short and catchy as in
              advertisement
            </p>
            <input
              type="text"
              name="title"
              value={formDescription.title}
              onChange={handleChangeDescription}
              placeholder="title, for example: My lovely apt "
              className="p-3 border border-black-2 w-[30%] rounded-md focus:outline-none focus:border-2 focus:border-primary text-sm "
            />
          </div>
          {/* Address */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Address</h2>
            <p className="text-sm opacity-80">Address to this place</p>
            <input
              type="text"
              value={formAddress}
              placeholder="title, for example: My lovely apt "
              onChange={(e) => setFormAddress(e.target.value)}
              className="p-3 border border-black-2 w-[30%] rounded-md focus:outline-none focus:border-2 focus:border-primary text-sm "
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
            <div className="flex flex-col flex-wrap gap-4 mt-2">
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
                      <div className="flex flex-col gap-1 py-3 px-3 leading-tight">
                        <p className="text-base font-semibold">{c?.title}</p>
                        <p className="text-sm">{c?.description}</p>
                      </div>
                      <div className="pr-3">{c.icon}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accomodation Count */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">
              Set Accomodation Limit
            </h2>
            <p className="text-sm opacity-80">
              Set some accomodation limit of your place
            </p>

            <div className="flex gap-2 flex-wrap items-center">
              {/* Guest Count */}
              <div className="flex flex-wrap gap-10 mt-3">
                <div className="flex items-center gap-6 max-w-54 py-4 px-4 border border-gray-300 rounded-lg">
                  <p className="font-semibold">Guests</p>
                  <div className="flex items-center gap-2 text-2xl w-20">
                    <CiCircleMinus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => {
                        guestCount > 1 && setGuestCount(guestCount - 1);
                      }}
                    />
                    <span className="text-base">{guestCount}</span>
                    <CiCirclePlus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => setGuestCount(guestCount + 1)}
                    />
                  </div>
                </div>
              </div>

              {/* Bedroom Count */}
              <div className="flex flex-wrap gap-10 mt-3">
                <div className="flex items-center gap-6 max-w-54 py-4 px-4 border border-gray-300 rounded-lg">
                  <p className="font-semibold">Bedrooms</p>
                  <div className="flex items-center gap-2 text-2xl w-20">
                    <CiCircleMinus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => {
                        bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                      }}
                    />
                    <span className="text-base">{bedroomCount}</span>
                    <CiCirclePlus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => setBedroomCount(bedroomCount + 1)}
                    />
                  </div>
                </div>
              </div>

              {/* Beds Count */}
              <div className="flex flex-wrap gap-10 mt-3">
                <div className="flex items-center gap-6 max-w-54 py-4 px-4 border border-gray-300 rounded-lg">
                  <p className="font-semibold">Beds</p>
                  <div className="flex items-center gap-2 text-2xl w-20">
                    <CiCircleMinus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => {
                        bedCount > 1 && setBedCount(bedCount - 1);
                      }}
                    />
                    <span className="text-base">{bedCount}</span>
                    <CiCirclePlus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => setBedCount(bedCount + 1)}
                    />
                  </div>
                </div>
              </div>

              {/* Bathrooms Count */}
              <div className="flex flex-wrap gap-10 mt-3">
                <div className="flex items-center gap-6 max-w-54 py-4 px-4 border border-gray-300 rounded-lg">
                  <p className="font-semibold">Bathrooms</p>
                  <div className="flex items-center gap-2 text-2xl w-20">
                    <CiCircleMinus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => {
                        bathroomCount > 1 &&
                          setBathroomCount(bathroomCount - 1);
                      }}
                    />
                    <span className="text-base">{bathroomCount}</span>
                    <CiCirclePlus
                      className="cursor-pointer hover:text-primary"
                      onClick={() => setBathroomCount(bathroomCount + 1)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Perks */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Perks</h2>
            <p className="text-sm opacity-80">
              What kind of perks you will provide in your property
            </p>
            <div className="flex gap-4 mt-2 flex-wrap">
              {facilities.map((f, i) => {
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-center mr-3 cursor-pointer border border-gray-300 w-[120px] h-20 rounded-lg gap-2 ${
                      perks.includes(f.name)
                        ? "border-[2.5px] border-primary bg-primary bg-opacity-[0.07] transition-all ease-in"
                        : ""
                    }`}
                    onClick={() => handleSelectPerks(f.name)}
                  >
                    <div>{f?.icon}</div>
                    <p className="text-[12px]">{f?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload Photos */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Upload Photos</h2>
            <p className="text-sm opacity-80">Add Photos of your place</p>
            {/* Currently on Hold */}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Description</h2>
            <p className="text-sm opacity-80">Add description of your place</p>
            <textarea
              name="description"
              value={formDescription.description}
              onChange={handleChangeDescription}
              placeholder="Description..."
              className="border border-black-3 p-4 text-sm rounded-lg font-thin w-full md:w-[60%] focus:outline-none focus:border-2 focus:border-primary"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="text-[22px] font-semibold">Price</h2>
            <p className="text-sm opacity-80">Add Price per day</p>
            <div className="flex items-center">
              <span className="text-xl font-bold mr-4">Rs.</span>
              <input
                type="number"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                placeholder="100"
                required
                className="border border-black-3 p-3 rounded-lg font-thin w-40 focus:outline-none focus:border-2 focus:border-primary"
              />
            </div>
          </div>
          <button className="w-full py-2 bg-primary text-white text-lg font-normal text-center rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
