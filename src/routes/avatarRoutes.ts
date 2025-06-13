import { Router } from 'express';
import { UserAuth } from '../middlewares/userAuthentication';
import { getAvatar, uploadAvatar } from '../controllers/avatarControllers';

export const AvatarRouter = Router();

AvatarRouter.post('/upload', UserAuth, uploadAvatar);
AvatarRouter.get("/get-avatar", UserAuth, getAvatar);