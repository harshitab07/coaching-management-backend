import mongoose from "mongoose";

const studentFeesSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    fees: {
        january: { type: Number, default: 0 },
        february: { type: Number, default: 0 },
        march: { type: Number, default: 0 },
        april: { type: Number, default: 0 },
        may: { type: Number, default: 0 },
        june: { type: Number, default: 0 },
        july: { type: Number, default: 0 },
        august: { type: Number, default: 0 },
        september: { type: Number, default: 0 },
        october: { type: Number, default: 0 },
        november: { type: Number, default: 0 },
        december: { type: Number, default: 0 },
    }
}, { timestamps: true });

export default mongoose.model('students_fees', studentFeesSchema);