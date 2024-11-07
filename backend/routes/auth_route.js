import express from "express";
import multer from "multer";
import { register, login } from "../controller/auth_controller.js";
// import { storage } from "../cloudinaryConfig.js";

const router = express.Router();

// Old Multer code
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
*/

// const upload = multer({ storage });

/*
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
*/

var uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

// const upload = multer({ storage: storage });

router.post("/register", uploader.single("profileImage"), register);
router.post("/login", login);

export default router;
