
import mongoose from 'mongoose';
//to validate data coming from frontend we make schema 
//we define object in mongoose,Schema function
const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
})


//defining  which collection  to pass this schema
const user = mongoose.model('user',userSchema);
export default user;
