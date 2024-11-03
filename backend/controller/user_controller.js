import Booking from "../models/booking.model.js";

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
