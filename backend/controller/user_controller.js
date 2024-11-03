import Booking from "../models/booking.model.js";
import ListingModels from "../models/listing.model.js";
import User from "../models/user.model.js";

export const getTripList = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );

    if (!trips) {
      return next(errorHandler(404, "Booking not Found"));
    }

    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

export const addWishList = async (req, res, next) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not Found"));
    }
    const listing = await ListingModels.findById(listingId).populate("creator");

    if (!listing) {
      return next(errorHandler(404, "Listing not Found"));
    }

    const favoriteListing = user.wishList.find(
      (item) => item?._id.toString() === listingId
    );
    console.log("ListingID", listing);

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();

      res.status(200).json({
        message: "Listing is removed from Wishlist",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to Wishlist",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getPropertyList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const properties = await ListingModels.find({
      creator: userId,
    }).populate("creator");

    res.status(200).json(properties);
  } catch (err) {}
};
