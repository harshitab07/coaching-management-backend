import studentFeesModel from "../models/studentFeesModel.js";

export const getStudentFees = async (id) => {
    const studentFees = await studentFeesModel.findOne({student_id: id});
    return studentFees;
}

export const getStudentFeesForMonth = async (id, month) => {
    const studentFees = await studentFeesModel.findOne({student_id: id});
    const feesForMonthGiven = studentFees.fees[month];
    return feesForMonthGiven;
}