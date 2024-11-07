import express from "express";
import multer from "multer";
import {
  createListing,
  getListingBySearch,
  getListingDetails,
  getListings,
} from "../controller/listing_controller.js";

/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
*/
var uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 50 * 1024 * 1024 },
});
// console.log(uploader.array("listingPhotos"));
const router = express.Router();

router.post(
  "/create",
  uploader.array("listingPhotos"),
  // uploader.fields([{ name: "listingPhotos", maxCount: 10 }]),
  createListing
);
router.get("/", getListings);
router.get("/:listingId", getListingDetails);
router.get("/search/:search", getListingBySearch);

export default router;
