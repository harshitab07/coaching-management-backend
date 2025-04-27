import mongoose from "mongoose";

const studentFeesSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    fees: {
        January: { type: Number, default: 0 },
        February: { type: Number, default: 0 },
        March: { type: Number, default: 0 },
        April: { type: Number, default: 0 },
        May: { type: Number, default: 0 },
        June: { type: Number, default: 0 },
        July: { type: Number, default: 0 },
        August: { type: Number, default: 0 },
        September: { type: Number, default: 0 },
        October: { type: Number, default: 0 },
        November: { type: Number, default: 0 },
        December: { type: Number, default: 0 },
    }
}, { timestamps: true });

export default mongoose.model('students_fees', studentFeesSchema);