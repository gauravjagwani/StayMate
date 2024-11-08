import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import ShimmerImage from "./ShimmerImage";

const PhotoGallery = ({ listings, isLoading, setIsLoading }) => {
  console.log(listings);
  const photos = listings?.listingPhotoPaths;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  console.log(photos);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black/45 text-white min-h-screen z-[1000] transition-all ease-out">
        <div className="bg-black/80 p-8 grid gap-4">
          <div>
            <h2>Photos of {listings?.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 items-center md:py-2 md:px-4 py-1 px-3 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <IoMdClose />
              Close photos
            </button>
          </div>
          {photos?.length > 0 &&
            photos.map((photo, i) => (
              <div key={i}>
                <img className="w-full " src={photo} alt="Listing Images" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-4 md:auto-rows-[300px] md:gap-2 relative">
      {photos &&
        photos
          .slice(0, 5)
          .map((photo, i) => (
            <img
              key={i}
              onClick={() => setShowAllPhotos(true)}
              src={photo}
              className={`rounded-2xl object-cover w-full h-full cursor-pointer hover:opacity-90 ${
                i === 0 ? "row-span-2 col-span-2" : ""
              }`}
              alt=""
            />
          ))}
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-5 right-5 bg-white text-sm flex gap-2 px-2 py-2 rounded-xl items-center"
      >
        <IoMdPhotos className="w-5 h-5" />
        Show All Photos
      </button>
    </div>
  );
};

export default PhotoGallery;
