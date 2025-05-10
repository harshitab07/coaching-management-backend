import studentModel from "../models/studentModel.js";
import Response from "../helpers/response.js";
import studentFeesModel from "../models/studentFeesModel.js";

export const createStudentController = async (req, res) => {
  try {
    const { name, adhaar_number, father_name, date_of_joining, address, course, status, phone_number, admin_id, gender, admission_fees, serial_number } = req.body;
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
      case !admission_fees:
        return Response(res, 200, false, "Admission Fees is required");
      case !serial_number:
        return Response(res, 200, false, "Serial Number is required");
    }

    const existingStudent = await studentModel.findOne({ adhaar_number });
    if (existingStudent) {
      return Response(res, 200, false, "Student with this Aadhaar number already exists");
    }

    const existingSerialStudent = await studentModel.findOne({ serial_number });
    if (existingSerialStudent) {
      return Response(res, 200, false, "Student with this Serial number already exists");
    }

    const student = new studentModel({ name, father_name, adhaar_number, phone_number, date_of_joining, address, status, admin_id , course, gender, admission_fees, serial_number});
    await student.save();

    const studentFess = new studentFeesModel({student_id: student._id});
    await studentFess.save();
    return Response(res, 200, true, "Created Student Successfully!", student);
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

export const updateStudentController = async (req, res) => {
  try {
    const { _id, name, adhaar_number, father_name, phone_number, address, course, status,date_of_joining, admission_fees, gender, serial_number } = req.body;
  
    const updatedStudent = await studentModel.findByIdAndUpdate(
      _id,
      {
        name, 
        adhaar_number, 
        father_name, 
        phone_number, 
        address, 
        course, 
        status, 
        date_of_joining,
        admission_fees,
        gender,
        serial_number
      },
      { new: true }
    );

    if (!updatedStudent) {
      return Response(res, 200, false, "Failed to update student");
    }

    return Response(res, 200, true, "Successfully updated the student", updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    return Response(res, 500, false, "Server error, please try again later");
  }
}

export const deleteStudentController = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedStudent = await studentModel.findByIdAndDelete(_id);

    if (!deletedStudent) {
      return Response(res, 200, false, 'Unable to find student');
    }

    await studentFeesModel.findOneAndDelete({student_id: _id});

    return Response(res, 200, true, 'Student Deleted');
  } catch (error) {
    return Response(res, 404, false, 'Unable to delete student', null, error);
  }
}

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

export const getLeftStudentsController = async (req, res) => {
  try {
    const students = await studentModel.find({ status: "Left" });

    return Response(res, 200, true, "Retrieved Left Students Successfully!", {
      total: students?.length,
      students,
    });
  } catch (error) {
    return Response(
      res,
      500,
      false,
      "Failed to get Left Students",
      null,
      error?.message || error
    );
  }
};

export const getActiveStudentsController = async (req, res) => {
  try {
    const students = await studentModel.find({status: "On-Going"});

    return Response(res, 200, true, "Retrieved On-Going Students Successfully!", {
      total: students?.length,
      students,
    });
  } catch (error) {
    return Response(
      res,
      500,
      false,
      "Failed to get On-Going Students",
      null,
      error?.message || error
    );
  }
};

export const getCompletedStudentsController = async (req, res) => {
  try {
    const students = await studentModel.find({status: "Completed"});

    return Response(res, 200, true, "Retrieved Completed Students Successfully!", {
      total: students?.length,
      students,
    });
  } catch (error) {
    return Response(
      res,
      500,
      false,
      "Failed to get Completed Students",
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

export const updateStudentFeesController = async (req, res) => {
  try {
    const { _id, month, fees, date, remark } = req.body;

    const studentFees = await studentFeesModel.findOne({ student_id: _id });
    if (!studentFees) {
      return Response(res, 404, false, "Student fees record not found");
    }

    // Conditionally update fee
    if (fees !== undefined && fees !== null && !isNaN(Number(fees))) {
      studentFees.fees[month] = Number(fees);
      if (fees == 0) {
        studentFees.paymentDates[month] = null;
        studentFees.remarks[month] = null;
      }
    }

    // Conditionally update date
    if (date && !isNaN(Date.parse(date))) {
      studentFees.paymentDates[month] = new Date(date);
    }

    // Conditionally update remark
    if (remark !== undefined && remark !== null) {
      // Check if remark is a string and not empty
      if (typeof remark === 'string' && remark.trim() !== '') {
        studentFees.remarks[month] = remark;
      } else {
        // If the remark is empty, you could either set it as an empty string or leave it unchanged
        studentFees.remarks[month] = ""; // or keep the existing value
      }
    }

    await studentFees.save();

    return Response(res, 200, true, "Successfully updated the student's fees and payment date", studentFees);
  } catch (error) {
    console.error("Error updating student's fees:", error);
    return Response(res, 500, false, "Server error, please try again later");
  }
};
