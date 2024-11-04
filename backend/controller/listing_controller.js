import ListingModels from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
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

    // console.log("Before...", creator, title, category, type);
    // * LISTING PHOTOS CODE LATER

    const listingPhotos = req.files;

    // if (!listingPhotos) {
    //   next(errorHandler(400, "No File Uploaded"));
    // }
    // const listingPhotoPaths = listingPhotos.map((file) => file.path);
    const listingPhotoPaths = listingPhotos.map((photo) => photo.path);
    console.log("PHOTOS", listingPhotoPaths);

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
      listingPhotoPaths,
      description,
      price,
    });
    // console.log("After...", newListings);

    await newListings.save();
    res.status(201).json(newListings);
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  const qCategory = req.query.category;

  try {
    let listings;

    if (qCategory) {
      listings = await ListingModels.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await ListingModels.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

export const getListingDetails = async (req, res, next) => {
  try {
    const { listingId } = req.params;

    const listing = await ListingModels.findById(listingId).populate("creator");
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
      listings = await ListingModels.find().populate("creator");
    } else {
      listings = await ListingModels.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
