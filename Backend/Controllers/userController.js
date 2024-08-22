import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataUri } from "../utils/DataUri.js";
import cloudinary from "../utils/Cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, phone } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content
    );
    if (!fullName || !email || !password || !role || !phone) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      profile: {
        profilePhoto: cloudinaryResponse.secure_url,
      },
    });

    return res.status(201).json({
      user,
      message: "User registerd successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in register user",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Check Role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "The selected role doesn't match",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, options).json({
      user,
      message: "User login successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in login user",
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("token", options).json({
      message: "User logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in logout user",
      success: false,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { email, phone, fullName, bio, skills } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content,
      {
        resource_type: "raw",
      }
    );

    let skillsArray = [];

    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    const userId = req.userId;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skillsArray.length > 0) user.profile.skills = skillsArray;
    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();
    return res.status(200).json({
      user,
      message: "Profile updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error in updating user profile",
      success: false,
    });
  }
};
