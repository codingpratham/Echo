import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    onboardingCompleted:{
        type:Boolean,
        default:false,

    },
    onboarding:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Onboarding'
    },
    refreshToken:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RefreshToken'
    },
    passwordResetToken:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PasswordResetToken'
    }
})

const User = mongoose.model('User',userSchema);

export default User;