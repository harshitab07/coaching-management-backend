import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    answer: {
        type: String,
        trim: true,
        required: true
    },
    role: { 
        type: String, 
        default: 'admin' 
    },
    is_super_admin: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

export default mongoose.model('admins', adminSchema);