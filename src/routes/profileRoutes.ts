import { Router } from 'express';
import { UserAuth } from '../middlewares/userAuthentication';
import { createProfile, getProfile, updateProfile } from '../controllers/profileControllers';

export const ProfileRouter = Router();


// Profile routes
ProfileRouter.post('/create' , UserAuth , createProfile); // create profile
ProfileRouter.get('/:username', getProfile); // Get the user's profile by username
ProfileRouter.put('/update' , UserAuth, updateProfile); // update profile!

// // Project routes
// ProfileRouter.post('/profiles/projects', UserAuth, addProject);
// ProfileRouter.get('/profiles/:userId/projects', getProjects);
// ProfileRouter.post('/projects/:projectId/like' , UserAuth, likeProject);

// // Project comments routes
// ProfileRouter.post('/projects/:projectId/comments', UserAuth, addProjectComment);
// ProfileRouter.get('/projects/:projectId/comments', getProjectComments);