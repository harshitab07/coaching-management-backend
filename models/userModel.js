import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'],
        required: true
    },
    answer: {
        type: String,
        require: true,
    },
}, {timestamps: true});

export default mongoose.model('users', userSchema);