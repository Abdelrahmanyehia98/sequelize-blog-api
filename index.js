import express from 'express';
import UserRouter from './src/Modules/User/user.controller.js';
import PostRouter from './src/Modules/Post/post.controller.js';
import CommentRouter from './src/Modules/Comment/comment.controller.js';
import { dbconnection } from './src/DB/db.connection.js';
import {User} from'./src/DB/Models/user.model.js';
import {Post} from'./src/DB/Models/post.model.js';
import {Comment} from'./src/DB/Models/comment.model.js';




const app = express();
app.use(express.json());

User
Post
Comment



await dbconnection();
app.use('/user',UserRouter);
app.use('/post',PostRouter);
app.use('/comment', CommentRouter);    





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});