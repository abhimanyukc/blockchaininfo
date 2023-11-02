import mongoose from 'mongoose';

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

const user = mongoose.model('user',userSchema);
export default user;
