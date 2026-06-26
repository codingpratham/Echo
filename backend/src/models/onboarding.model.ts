import mongoose from 'mongoose';

const onboardingSchema = new mongoose.Schema({
    id:{   
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
    bio:{
        type:String,
        default:''
    },
    profilePicture:{
        type:String,
        default:''  
    }
},{id:false})

onboardingSchema.pre('validate', function() {
    if (!this.id) {
        this.id = this._id.toString();
    }
})

const Onboarding = mongoose.model('Onboarding',onboardingSchema);

export default Onboarding;