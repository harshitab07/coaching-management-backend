import mongoose from "mongoose";

const studentFeesSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    monthly_fees: {
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

export default mongoose.model('students_fees', studentFeesSchema);