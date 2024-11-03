import express from "express";
import { addWishList, getTripList } from "../controller/user_controller.js";

const router = express.Router();

router.get("/:userId/trips", getTripList);
router.patch("/:userId/:listingId", addWishList);

export default router;
