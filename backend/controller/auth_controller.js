import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cloudinary } from "../cloudinaryConfig.js";
import { errorHandler } from "../utils/error.js";
import { uploadFile } from "../cloudinaryConfig.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const profileImage = req.file;
    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }
    // Upload image to Cloudinary
    // const uploadResponse = await cloudinary.uploader.upload(profileImage.path, {
    //   folder: "profile_images", // Optional: specify folder in Cloudinary
    // });

    const uploadResponse = await uploadFile(profileImage.path);

    // const profileImagePath = profileImage.path;
    const existingUser = await User.findOne({ email });
    // Validating if user already exists
    if (existingUser) {
      return res.status(409).json({ error: "User Already Exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage: uploadResponse.secure_url,
    });

    await newUser.save();
    res.json({ message: "User created Successfully", user: newUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "Invalid Credentials"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    console.log("IspasswordValid:", validPassword);

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // console.log("DOCSS :", validUser._doc);
    const { password: pass, ...rest } = validUser._doc;
    console.log(pass);
    res.json({
      token,
      rest,
    });
  } catch (err) {
    next(err);
  }
};
