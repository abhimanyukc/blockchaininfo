//for pw encryption in db colln
import bcrypt from 'bcrypt';
//for matching pw
import  jwt  from 'jsonwebtoken';

//importing user to validate user schema
import User from '../model/user.js';
//for secret key
import dotenv from 'dotenv';
//for token colln
import Token from '../model/token.js';
//intialize dotenv
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
        //to convert password in random string we use hash function,appending no of salt with hash shows encrypted pw
        //request.body.password show password coming from post api
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
    //to check if user exist or not. using findone function to check obj username
    let user = await User.findOne({username: request.body.username});
    //for not getting user
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match'})
    }

    try {

        //using bcrypt compare method first arg contain pw from frontend 2nd arg contain pw in hashed form stored in users colln

        let match = await bcrypt.compare(request.body.password,user.password);
        if (match) {
            //if match we generate acesstoken and refresh token with help of jwt auth
            //we need refreshtoken to generate access token again and accesstoken expires after 15min , 
            //we use jwt with sign method that use body in json format and secretkey
            const accessToken =  jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
       
      //storing refreshtoken and saving
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