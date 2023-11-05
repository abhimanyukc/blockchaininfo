
//with the help of express we can make route
import express from 'express';

//importing api function
import { signupUser, loginUser } from '../controller/user-controller.js';
import { uploadImage , getImage} from '../controller/image-controller.js';
import {createPost, getAllPosts,getPost, updatePost, deletePost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment, getComments , deleteComment } from '../controller/comment-controller.js';

import upload from '../utils/upload.js'

//intializing router with Router function
const router = express.Router();
//facebook.com is api url
//to make api here we make all routes
//route is endpoint of api like /signup
//signupUser is function to call api
router.post('/signup',signupUser);
router.post('/login', loginUser);
//2nd argument is middleware
router.post('/file/upload',upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create',authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);

router.get('/post/:id', authenticateToken, getPost);

router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

//exporting router
export default router;

