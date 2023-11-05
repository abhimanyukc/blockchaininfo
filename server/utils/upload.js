
//to format image
//multer work as middleware for hndling multipart/form-data,with multer we can upload file in mongodb
//gridfs-storage engine for multer to store uploaded files directly to mongodb
import multer from 'multer';
import { GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage(
    {
        //obj stored in keyvalue pairs
        url: `mongodb://${username}:${password}@ac-4pxlqfp-shard-00-00.cgkizrg.mongodb.net:27017,ac-4pxlqfp-shard-00-01.cgkizrg.mongodb.net:27017,ac-4pxlqfp-shard-00-02.cgkizrg.mongodb.net:27017/?ssl=true&replicaSet=atlas-u2jfud-shard-0&authSource=admin&retryWrites=true&w=majority`,
        options: { useNewUrlParser: true},
        file: (request, file) => {
            const match = ["image/png", "image/jpg" , "image/jpeg"];

            //file.memetype check img extension
            if (match.indexOf(file.memeType) === -1) {
                return `${Date.now()}-blog-${file.originalname}`;
            }

            return {
                bucketName: "photos",
                filename: `${Date.now()}-blog-${file.originalname}`
            }
        }

    }
)

export  default multer({storage});