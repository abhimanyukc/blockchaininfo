//entry point file for backend
//const express = require('express'); used in previous syntax
//code from javascript es6(ECMAScript)
import express from 'express';
import dotenv from 'dotenv';
//installing cors for security and to run client ,server in different port.
import cors from 'cors';
//to handle post api  req we use body-parser ,for req with body
import bodyParser from 'body-parser';
//importing connection
import Connection  from './database/db.js';
//importing Router
import Router from './routes/route.js';
//initialize dotenv with config function
dotenv.config();
//initializing express as a function
const app = express();

//using cors as a function
app.use(cors());
//extended true to parse json format
app.use(bodyParser.json( {extended: true}));
//to parse url (like url enter with space)
app.use(bodyParser.urlencoded({ extended: true }));
//using Router as app component with use function
app.use('/', Router);

const PORT = 8000;
//to make express server we use app and listen function with two argument
//to run server we can run with help of node,from node we can run our backend
//we make start scripts in package.json to run our backend

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
//proces.env used to  pick username and password from env file
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
//passing username and password in connection function
Connection(USERNAME, PASSWORD);