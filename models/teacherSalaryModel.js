import mongoose from "mongoose";

const teacherSalarySchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    monthly_salary: {
        type: Number,
        required: true
    },
    last_paid_amount: {
        type: Number,
        required: false
    },
    last_paid_date: {
        type: Date,
        required: false
    },
}, {timestamps: true});

export default mongoose.model('teachers_salary', teacherSalarySchema);