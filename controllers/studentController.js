import studentModel from "../models/studentModel.js";
import Response from "../helpers/response.js";
import studentFeesModel from "../models/studentFeesModel.js";

export const createStudentController = async (req, res) => {
  try {
    const { name, adhaar_number, father_name, date_of_joining, address, course, status, phone_number, admin_id } = req.body;
    // validation
    switch (true) {
      case !name:
        return Response(res, 200, false, "Name is required");
      case !father_name:
        return Response(res, 200, false, "Father's name is required");
      case !adhaar_number:
        return Response(res, 200, false, "Adhaar Number is required");
      case !date_of_joining:
        return Response(res, 200, false, "Date of Joining is required");
      case !course:
        return Response(res, 200, false, "Course is required");
    }

    const student = new studentModel({ name, father_name, adhaar_number, phone_number, date_of_joining, address, status, admin_id , course});
    await student.save();
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

    return Response(res, 200, true, "Retrieved Students Successfully!", {
      total: students?.length,
      students,
    });
  } catch (error) {
    return Response(
      res,
      500,
      false,
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

    return Response(res, 200, true, "Retrieved Student Successfully!", student);
  } catch (error) {
    return Response(
      res,
      500,
      false,
      "Failed to get Student",
      null,
      error?.message || error
    );
  }
};

export const getStudentFeesController = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const studentFees = await studentFeesModel.findOne({student_id: _id});

    return Response(res, 200, true, "Retrieved Student Fees Successfully!", studentFees);
  } catch (error) {
    return Response(
      res,
      500,
      false,
      "Failed to get Student Fees",
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
    return Response(res, 200, true, "Students filtered successfully!", students);
  } catch (error) {
    return Response(
      res,
      500,
      false,
      "Failed to filter students",
      null,
      error?.message || error
    );
  }
};
