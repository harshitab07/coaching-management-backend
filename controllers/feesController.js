import studentModel from "../models/studentModel.js";
import Response from "../helpers/response.js";
import { getStudentFeesForMonth } from "../helpers/studentFees.js";

export const getPendingFeesForTheMonth = async (req, res) => {
    try {
        const { month } = req.body;

        const students = await studentModel.find({ status: "On-Going" });

        if (!students) {
            return Response(
                res,
                500,
                false,
                "Failed to get Student",
                null,
                error?.message || error
            );
        }

        const pendingFeesDetails = {
            studentDetails: [],
            pendingFees: 0
        };

        await Promise.all(
            students.map(async (student, i) => {
                const studentFeesPaidForMonth = await getStudentFeesForMonth(student._id, month);
                if (!studentFeesPaidForMonth) {
                    pendingFeesDetails.studentDetails.push({
                        name: student.name,
                        id: student._id,
                        fees: student.monthly_fees,
                        father_name: student.father_name
                    });
                    pendingFeesDetails.pendingFees += student.monthly_fees;
                }
            })
        );
        return Response(res, 200, true, "Pending fees fetched successfully", pendingFeesDetails);
    } catch (error) {
        console.error(error);
        return Response(res, 500, false, "Failed to get pending fees", null, error.message || error);
    }
}