import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        required: false
    }
}, {timestamps: true});

export default mongoose.model('users', userSchema);