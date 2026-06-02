import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const PasswordResetToken = mongoose.model('PasswordResetToken',passwordResetTokenSchema);

export default PasswordResetToken;