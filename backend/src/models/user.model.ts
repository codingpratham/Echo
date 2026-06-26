import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        index:true
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
    isOnboarding:{
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
},{ id:false })

userSchema.pre('validate', function() {
    if (!this.id) {
        this.id = this._id.toString();
    }
})

const User = mongoose.model('User',userSchema);

export default User;
