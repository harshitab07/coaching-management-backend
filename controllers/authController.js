import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Response from "../helpers/response.js";
import adminModel from "../models/adminModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;

    // validation
    if (!name) {
      return Response(res, 200, false, "Name is required");
    }

    if (!email) {
      return Response(res, 200, false, "Email is required");
    }

    if (!password) {
      return Response(res, 200, false, "Password is required");
    }

    if (!answer) {
      return Response(res, 200, false, "Answer is required");
    }

    // make sure its unique
    const admin = await adminModel.findOne({ email });
    if (admin) {
      return Response(
        res,
        200,
        false,
        "Admin already registered. Please LogIn"
      );
    }

    // save admin
    const hashedPassword = await hashPassword(password);
    const newAdmin = await new adminModel({
      name,
      email,
      password: hashedPassword,
      answer,
    }).save();

    return Response(res, 200, true, "Admin registered successfully!");
  } catch (err) {
    console.log("Error in registerController", { err });
    return Response(res, 200, false, "Error in registration!");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return Response(res, 200, false, "Invalid Email or Password!");
    }

    // check user
    const user = await adminModel.findOne({ email });

    if (!user) {
      return Response(res, 200, false, "Admin not found!");
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return Response(res, 200, false, "Invalid Password!");
    }

    // create token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      isResultCorrect: true,
      message: "Logged in successfully!",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user?._id,
      },
      token,
    });
  } catch (err) {
    console.log("Error in loginController", { err });
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: err,
    });
  }
};

// change password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, password, answer } = req.body;

    if (!email || !password || !answer) {
      return Response(
        res,
        200,
        false,
        "Email, password and answer are required!"
      );
    }

    const user = await adminModel.findOne({ email });
    if (!user) {
      return Response(res, 200, false, "Invalid email!");
    }

    if (user.answer !== answer) {
      return Response(res, 200, false, "Incorrect answer!");
    }

    const hashedPassword = await hashPassword(password);

    await adminModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to change password",
      error,
    });
  }
};

export const profileController = async (req, res) => {
  try {
    const { email, address, phone, id: _id } = req.body;

    const user = await adminModel.findById(req.user._id);
    const updatedUser = await adminModel.findByIdAndUpdate(
      req.user._id,
      { address: address || user?.address, phone: phone || user?.phone },
      { new: true }
    );
    console.log({ updatedUser });
    res.status(200).send({
      success: true,
      message: "Updated profile successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update profile",
      error: error.message || error,
    });
  }
};
