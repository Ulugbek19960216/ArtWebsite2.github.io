const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ArtWebsite")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed',e);
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email: {
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword: {
        type:String,
        required: true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection

