import { Router } from 'express';
import * as services from './Services/user.service.js';

const userRouter = Router();
userRouter.post('/createUser',services.CreateNewUser);
userRouter.put('/createOrUpdate/:id',services.CreateOrUpdate);
userRouter.get('/byEmail',services.getUserByEmail);
userRouter.get('/:id',services.getUserById);




export default userRouter;