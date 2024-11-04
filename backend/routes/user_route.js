import express from "express";
import {
  addWishList,
  getPropertyList,
  getReservationList,
  getTripList,
} from "../controller/user_controller.js";

const router = express.Router();

router.get("/:userId/trips", getTripList);
router.patch("/:userId/:listingId", addWishList);
router.get("/:userId/properties", getPropertyList);
router.get("/:userId/reservations", getReservationList);

export default router;
