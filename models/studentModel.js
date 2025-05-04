import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    adhaar_number: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: false
    },
    course: {
        type: String,
        trim: true,
        required: true
    },
    date_of_joining: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: false
    },
    status: {
        type: String,
        enum: ['On-Going', 'Completed', 'Left'],
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: false
    },
    admission_fees: {
        type: String,
        required: true
    },
}, {timestamps: true});

export default mongoose.model('students', studentSchema);