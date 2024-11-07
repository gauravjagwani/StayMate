import { uploadFile } from "../cloudinaryConfig.js";
import ListingModels from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
  console.log("CREATE LISTING LOG");
  try {
    const {
      creator,
      title,
      category,
      type,
      address,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      perks,
      description,
      price,
    } = req.body;

    // * LISTING PHOTOS CODE LATER

    const listingPhotos = req.files;

    if (!listingPhotos) {
      next(errorHandler(400, "No File Uploaded"));
    }
    // const listingPhotoPaths = listingPhotos.map((file) => file.path);
    const filePaths = listingPhotos.map((file) => file.path);
    // const listingPhotoPaths = listingPhotos.map((photo) => photo.path);
    const uploadResponses = await uploadFile(filePaths);
    // console.log("PHOTOS", uploadResponses);
    // const profileImageUrls = uploadResponses.map(
    //   (response) => response.secure_url
    // );

    const newListings = new ListingModels({
      creator,
      title,
      category,
      type,
      address,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      perks,
      listingPhotoPaths: uploadResponses,
      description,
      price,
    });
    // console.log("After...", newListings);

    await newListings.save();
    res.status(201).json(newListings);
  } catch (err) {
    console.log(err.message);
    // next(err);
  }
};

export const getListings = async (req, res, next) => {
  const qCategory = req.query.category;

  try {
    let listings;

    if (qCategory) {
      listings = await ListingModels.find({ category: qCategory }).populate({
        path: "creator",
        select: "-email -password",
      });
    } else {
      listings = await ListingModels.find().populate({
        path: "creator",
        select: "-email -password",
      });
    }

    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getListingDetails = async (req, res, next) => {
  try {
    const { listingId } = req.params;

    const listing = await ListingModels.findById(listingId).populate({
      path: "creator",
      select: "-email -password",
    });
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const getListingBySearch = async (req, res, next) => {
  try {
    const { search } = req.params;

    let listings = [];
    if (search === "all") {
      listings = await ListingModels.find().populate({
        path: "creator",
        select: "-email -password",
      });
    } else {
      listings = await ListingModels.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate({
        path: "creator",
        select: "-email -password",
      });
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
