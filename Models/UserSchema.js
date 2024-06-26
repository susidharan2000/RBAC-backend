import  mongoose from "mongoose";

const user_Schema = mongoose.Schema({
    username:{
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
    role:{
        type:String,
        default:"guest",
        required: true
    },
    profilePic:{
        type:String,
        required:true,
        default:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_640.png&f=1&nofb=1&ipt=fd2fc049c71669a474d1f11650bd791f37cb5d5a1cf924d7bae706771fbd2149&ipo=images"
    },
    fname:{
        type:String,
        default:""
    },
    lname:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        default:"male"
    },
    phonenumber:{
        type:String,
        default:""
    },
    experiance:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    taskCompleted:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Task",
    },
    taskPending:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Task",
    }
},{timestamps:true});
const User = mongoose.model("User",user_Schema);

export default User;