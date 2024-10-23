import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    address: {
      type: String,
    },
    guestCount: {
      type: Number,
    },
    bedroomCount: {
      type: Number,
    },
    bedCount: {
      type: Number,
    },
    bathroomCount: {
      type: Number,
    },
    perks: {
      type: Array,
      default: [],
    },

    listingPhotoPaths: [{ type: String }],

    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ListingModels = mongoose.model("ListingModels", listingSchema);

export default ListingModels;
