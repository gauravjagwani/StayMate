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

    console.log("Before...", creator, title, category, type);
    // * LISTING PHOTOS CODE LATER
    /*
    const listingPhotos = req.files

    if (!listingPhotos) {
      next(errorHandler(400, "No File Uploaded"));
    }
    const listingPhotoPaths = listingPhotos.map((file) => file.path)
    */
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
      description,
      price,
    });
    console.log("After...", newListings);

    await newListings.save();
    res.status(201).json(newListings);
  } catch (err) {
    next(err);
  }
};
