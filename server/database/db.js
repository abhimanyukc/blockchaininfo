//to connect our app to cloud.mongodb we use this file

//importing mongoose library for db conn
import mongoose from "mongoose"


 const Connection = async (username,password) => {
    const URL = `mongodb://${username}:${password}@ac-4pxlqfp-shard-00-00.cgkizrg.mongodb.net:27017,ac-4pxlqfp-shard-00-01.cgkizrg.mongodb.net:27017,ac-4pxlqfp-shard-00-02.cgkizrg.mongodb.net:27017/?ssl=true&replicaSet=atlas-u2jfud-shard-0&authSource=admin&retryWrites=true&w=majority`;
   try {

    //we use connect function in mongoose with two argument
    //1st argument conn string i.e URL to connect mongodb
    //2nd argument object ,useNewUrlParser to deprecate oldurlparser
     //mongoose.connect is asynchronous function as it return promise so tasks can run indepently and separately
     //we use try catch for exception handling
    await mongoose.connect(URL, {useNewUrlParser: true});
    console.log('Database connected succesfully');

   } catch (error) {
     console.log('Error while connecting with the database',error);
   }
}


//default export
export default Connection;