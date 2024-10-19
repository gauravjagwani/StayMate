import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const profileImage = req.file;
    console.log("Profile Image", profileImage);
    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;
    const existingUser = await User.findOne({ email });
    // Validating if user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage: profileImagePath,
    });

    await newUser.save();
    res.json({ message: "User created Successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(409).json({ message: "Invalid Credentials" });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return res.status(409).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    console.log("DOCSS :", validUser._doc);
    const { password: pass, ...rest } = validUser._doc;
    console.log(pass);
    res.json({
      token,
      rest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
