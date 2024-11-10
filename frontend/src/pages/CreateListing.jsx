import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { categoryItems, facilities, types } from "../lib/utils";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import Footer from "../components/Footer";

const CreateListing = () => {
  const navigate = useNavigate();
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

  // const [isError, setIsError] = useState(false);
  const [photos, setPhotos] = useState([]);
  // useEffect(() => {
  //   if (photos.length < 5) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //   }
  // }, [photos]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);

    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const creatorId = useSelector((state) => state?.user?.user?._id);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const listingsForm = new FormData();
      listingsForm.append("creator", creatorId);
      listingsForm.append("title", formDescription.title);
      listingsForm.append("category", category);
      listingsForm.append("address", formAddress);
      listingsForm.append("type", type);
      listingsForm.append("guestCount", guestCount);
      listingsForm.append("bedroomCount", bedroomCount);
      listingsForm.append("bedCount", bedCount);
      listingsForm.append("bathroomCount", bathroomCount);
      listingsForm.append("description", formDescription.description);
      listingsForm.append("price", formDescription.price);

      perks.forEach((perk) => {
        listingsForm.append("perks", perk);
      });

      photos.forEach((photo) => {
        listingsForm.append("listingPhotos", photo);
      });

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/listings/create`,
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },

          body: listingsForm,
        }
      );
      if (res.ok) {
        console.log("Data Posted Successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />

      <div className=" px-5 flex flex-col py-10 lg:px-3 pb-30 min-h-60 mx-auto">
        <h1 className="text-sm md:text-3xl flex justify-center mb-6 font-semibold">
          Create Your Listing
        </h1>
        <form className="px-20 flex flex-col gap-4" onSubmit={handleSubmit}>
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
              {types.map((t) => {
                return (
                  <div
                    key={t?.id}
                    className={`flex flex-col justify-start mr-3 cursor-pointer border border-gray-300 w-[60%] h-20 rounded-lg gap-2 ${
                      type === t.title
                        ? "border-[2.5px] border-primary bg-primary bg-opacity-[0.07] transition-all ease-in"
                        : ""
                    }`}
                    onClick={() => setType(t.title)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1 py-3 px-3 leading-tight">
                        <p className="text-base font-semibold">{t?.title}</p>
                        <p className="text-sm">{t?.description}</p>
                      </div>
                      <div className="pr-3">{t.icon}</div>
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
            <p className="text-sm opacity-80">
              Add Photos of your place (Add Minimum of 5 Photos)
            </p>

            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="flex flex-wrap gap-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />

                        <label
                          htmlFor="image"
                          className="flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-300 py-10 px-[100px] rounded-lg"
                        >
                          <div className="text-6xl">
                            <IoIosImages />
                          </div>

                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="relative w-64 h-36 cursor-move"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                  className="w-full h-full object-cover"
                                />

                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                  className="absolute ring-0 top-0 p-1 bg-white bg-opacity-80 text-lg cursor-pointer"
                                >
                                  <BiTrash className="text-red-700" />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}

                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />

                        <label
                          htmlFor="image"
                          className="flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-300 w-64 h-36"
                        >
                          <div className="text-6xl">
                            <IoIosImages />
                          </div>

                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                          {photos.length < 5 && (
                            <p className="text-red-500 font-medium">
                              Add Minimum of 5 Photos
                            </p>
                          )}
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
          <button
            type="submit"
            // disabled={true}
            className={`w-full py-2 bg-primary text-white text-lg font-normal text-center rounded-md cursor-pointer`}
          >
            Save
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateListing;
