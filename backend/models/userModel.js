import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

export default User;