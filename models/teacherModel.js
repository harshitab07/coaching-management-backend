import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    is_active: {
        type: Number,
        required: true
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: false
    },
    phone_number: {
        type: String,
        required: true
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    address: {
        street: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        pincode: {
            type: Number,
            required: false
        }
    }
}, {timestamps: true});

export default mongoose.model('teachers', teacherSchema);