//for storing new refresh token

import mongoose from 'mongoose';

//making schema
const tokenSchema = mongoose.Schema({
   token: {
    type: 'string',
    required: true
   } 
})

//making collection token
const token = mongoose.model('token', tokenSchema);

export default token;