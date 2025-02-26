import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    phone: {type: String, required: false},
})

const Users = mongoose.model('Users', userSchema);

export {Users};