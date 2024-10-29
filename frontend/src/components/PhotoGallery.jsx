import React from "react";

const PhotoGallery = ({ listings }) => {
  console.log(listings);
  const photos = listings?.listingPhotoPaths;
  console.log(photos);
  return (
    // <div className="relative">
    //   <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden  border border-red-500">
    //     <div>
    //       {photos?.[0] && (
    //         <div className="border border-black h-full">
    //           <img
    //             src={`http://localhost:4000/${photos?.[0].replace(
    //               "public",
    //               ""
    //             )}`}
    //             className="aspect-square cursor-pointer object-cover h-full"
    //             alt={listings?.title}
    //           />
    //         </div>
    //       )}
    //     </div>
    //     <div className="grid">
    //       {photos?.[1] && (
    //         <img
    //           src={`http://localhost:4000/${photos?.[1].replace("public", "")}`}
    //           className="aspect-square cursor-pointer object-cover"
    //           alt={listings?.title}
    //         />
    //       )}
    //       <div className="overflow-hidden">
    //         {photos?.[2] && (
    //           <img
    //             src={`http://localhost:4000/${photos?.[2].replace(
    //               "public",
    //               ""
    //             )}`}
    //             className="aspect-square cursor-pointer object-cover relative top-2"
    //             alt={listings?.title}
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="grid grid-cols-4 auto-rows-[300px] gap-2 ">
      {photos &&
        photos.slice(0, 5).map((photo, i) => (
          <img
            key={i}
            // src={`http://localhost:4000/${photos?.[0].replace("public", "")}`}
            src={`http://localhost:4000/${photos?.[i].replace("public", "")}`}
            className={`rounded-2xl object-cover w-full h-full ${
              i === 0 ? "row-span-2 col-span-2" : ""
            }`}
            alt=""
          />
        ))}
    </div>
  );
};

export default PhotoGallery;
