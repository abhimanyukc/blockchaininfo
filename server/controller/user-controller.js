import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';

//importing user to validate user schema
import User from '../model/user.js';
import dotenv from 'dotenv';
import Token from '../model/token.js';
dotenv.config();
//exporting signupUser(i.e api function) with callback function
//we make api here, request and response are object
//all things requested from frontend to backend comes from request like api url, api body,api headers,params
//what api response from  backend, send to frontend, 
export const signupUser = async (request, response) => {
    //we use exceptional handling ,to work with database as database is in form of cloud which is external entity so chances of error is high.
    try {
        // const salt = await bcrypt.genSalt();
        //data can be asynchronous req so we use await and async
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword}
        //user is passed in User for validn
        const newUser = new User(user);
        // mongodb save function  to save your obj in db
        await newUser.save();

        //for sending to frontend we use response keyword with msg
        return response.status(200).json({ msg: 'signup successful'});
    } catch (error) {

        return response.status(500).json({ msg: 'Error while sign up the user' });
    }

}

export const loginUser = async (request, response) => {
    let user = await User.findOne({username: request.body.username});
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match'})
    }

    try {

        let match = await bcrypt.compare(request.body.password,user.password);
        if (match) {
        const accessToken =  jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
       
        const newToken = new Token({token: refreshToken})
        await newToken.save();

        return response.status(200).json({ accessToken: accessToken, refreshToken:refreshToken, name:user.name, username: user.username})
    } else {
           return  response.status(400).json({ msg: 'Password does not match'});
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login in user'})
    }
}