import studentModel from "../models/studentModel.js";
import Response from "../helpers/response.js";
import { hashPassword } from "../helpers/authHelper.js";

export const createStudentController = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, date_of_joining, email, address } = req.fields;

    // validation
    switch (true) {
      case !first_name:
        return Response(res, 404, "Name is required");
      case !phone_number:
        return Response(res, 404, "Phone Number is required");
      case !date_of_joining:
        return Response(res, 404, "Date of Joining is required");
      case !email:
        return Response(res, 404, "Email is required");
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      const password = 123456;
      const hashedPassword = await hashPassword(password);
      user = await new userModel({
        first_name,
        email,
        password: hashedPassword,
        role,
        answer,
      }).save();
    }

    const product = new studentModel({ first_name, last_name, phone_number, date_of_joining, address, status: 1, user_id: user._id });
    await product.save();
    return Response(res, 200, "Created Student Successfully!", product);
  } catch (error) {
    return Response(
      res,
      500,
      "Failed to create Student",
      null,
      error?.message || error
    );
  }
};

export const getAllStudentsController = async (req, res) => {
  try {
    const students = await studentModel.find({});

    return Response(res, 200, "Retrieved Students Successfully!", {
      total: students?.length,
      students,
    });
  } catch (error) {
    return Response(
      res,
      500,
      "Failed to get all Students",
      null,
      error?.message || error
    );
  }
};

export const getStudentController = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const student = await studentModel.findById(_id);

    return Response(res, 200, "Retrieved Students Successfully!", student);
  } catch (error) {
    return Response(
      res,
      500,
      "Failed to get Student",
      null,
      error?.message || error
    );
  }
};

export const filterStudentsController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length) {
      args.category = checked;
    }

    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const students = await studentModel.find(args).exec();
    return Response(res, 200, "Students filtered successfully!", students);
  } catch (error) {
    return Response(
      res,
      500,
      "Failed to filter students",
      null,
      error?.message || error
    );
  }
};
