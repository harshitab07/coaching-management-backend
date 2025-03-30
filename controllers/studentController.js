import studentModel from "../models/studentModel.js";
import Response from "../helpers/response.js";
import { hashPassword } from "../helpers/authHelper.js";
import studentFeesModel from "../models/studentFeesModel.js";
import userModel from "../models/userModel.js";

export const createStudentController = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, date_of_joining, email, address, monthly_fees } = req.body;
    // validation
    switch (true) {
      case !email:
        return Response(res, 200, false, "Email is required");
      case !first_name:
        return Response(res, 200, false, "First name is required");
      case !phone_number:
        return Response(res, 200, false, "Phone Number is required");
      case !date_of_joining:
        return Response(res, 200, false, "Date of Joining is required");
      case !monthly_fees:
        return Response(res, 200, false, "Monthly Fees is required");
    }

    let user = await userModel.findOne({ email });
    if (user) {
      return Response(res, 200, false, "Student Already Present!");
    }

    const password = '123456';
    const hashedPassword = await hashPassword(password);
    user = await new userModel({
      first_name,
      email,
      password: hashedPassword,
      role: 'student',
      answer: 'null',
    }).save();

    const student = new studentModel({ first_name, last_name, phone_number, date_of_joining, address, status: 1, user_id: user._id , is_active: 1});
    await student.save();

    const fees = new studentFeesModel({ monthly_fees, student_id: student._id });
    await fees.save();
    return Response(res, 200, true, "Created Student Successfully!");
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
