import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { createProfileValidationSchema, updateProfileValidationSchema } from '../utils/zodSchema';

// Create user profile
export const createProfile = async (req: Request, res: Response) => {
    try {

        // If User ID Not found, Stop the execution!
        if (!(req as any).user) {
            res.status(401).json({
                message: "ACCESS DENIED"
            })
            return;
        }

        const result = createProfileValidationSchema.safeParse(req.body);

        // If validation fails, Stop the execution, returns the errors!!
        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }


        const { bio, website, github, twitter, instagram, linkedin, stackoverflow } = result.data;
        const userId = (req as any).user.id;

        // Check if profile already exists, ONLY for once the profile will be created, after that only updatation should will be allowed!
        const existingProfile = await prisma.userProfile.findUnique({
            where: {
                userId
            }
        });

        if (existingProfile) {
            res.status(400).json({ error: 'Profile already exists' });
            return;
        }

        const profile = await prisma.userProfile.create({
            data: {
                bio,
                website,
                github,
                twitter,
                instagram,
                linkedin,
                stackoverflow,
                userId
            }
        });

        res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        const USER = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!USER) {
            res.status(404).json({
                message: "Username not found!"
            })
            return;
        }

        const userId = USER.id;

        const profile = await prisma.userProfile.findUnique({
            where: { userId },
            include: {
                projects: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!profile) {
            res.status(404).json({
                message: "Profile not completed!!",
                status: "error"
            });
            return;
        }

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
    try {

        // If User ID Not found, Stop the execution!
        if (!(req as any).user) {
            res.status(401).json({
                message: "ACCESS DENIED"
            })
            return;
        }

        const result = updateProfileValidationSchema.safeParse(req.body);

        // If validation fails, Stop the execution, returns the errors!!
        if (!result.success) {
            res.status(400).json({
                message: 'Validation error',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        const { bio, website, github, twitter, instagram, linkedin, stackoverflow } = result.data;
        const userId = (req as any).user.id;

        const updatedProfile = await prisma.userProfile.update({
            where: {
                userId
            },
            data: {
                bio,
                website,
                github,
                twitter,
                instagram,
                linkedin,
                stackoverflow
            }
        });

        res.json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something Went Wrong, Please Try Again Later"
        });
    }
};

// // Add project to profile
// export const addProject = async (req: Request, res: Response) => {
//     try {
//         const { title, description, link } = req.body;
//         const userId = req.user.id;

//         // Get user's profile
//         const profile = await prisma.userProfile.findUnique({
//             where: { userId }
//         });

//         if (!profile) {
//             return res.status(404).json({ error: 'Profile not found' });
//         }

//         const project = await prisma.project.create({
//             data: {
//                 title,
//                 description,
//                 link,
//                 profileId: profile.id
//             }
//         });

//         res.status(201).json(project);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to add project' });
//     }
// };

// // Get user's projects
// export const getProjects = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.params;

//         const projects = await prisma.project.findMany({
//             where: {
//                 profile: {
//                     userId
//                 }
//             },
//             orderBy: {
//                 createdAt: 'desc'
//             },
//             include: {
//                 comments: {
//                     take: 3, // Get only 3 latest comments
//                     orderBy: {
//                         createdAt: 'desc'
//                     },
//                     include: {
//                         author: {
//                             select: {
//                                 id: true,
//                                 username: true,
//                                 avatar: true
//                             }
//                         }
//                     }
//                 }
//             }
//         });

//         res.json(projects);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to get projects' });
//     }
// };

// // Like a project
// export const likeProject = async (req: Request, res: Response) => {
//     try {
//         const { projectId } = req.params;

//         const project = await prisma.project.update({
//             where: { id: projectId },
//             data: {
//                 likes: {
//                     increment: 1
//                 }
//             }
//         });

//         res.json(project);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to like project' });
//     }
// };

// // Add comment to project
// export const addProjectComment = async (req: Request, res: Response) => {
//     try {
//         const { projectId } = req.params;
//         const { content } = req.body;
//         const userId = req.user.id;

//         const comment = await prisma.projectComment.create({
//             data: {
//                 content,
//                 projectId,
//                 authorId: userId
//             },
//             include: {
//                 author: {
//                     select: {
//                         id: true,
//                         username: true,
//                         avatar: true
//                     }
//                 }
//             }
//         });

//         res.status(201).json(comment);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to add comment' });
//     }
// };

// // Get project comments
// export const getProjectComments = async (req: Request, res: Response) => {
//     try {
//         const { projectId } = req.params;

//         const comments = await prisma.projectComment.findMany({
//             where: { projectId },
//             orderBy: {
//                 createdAt: 'desc'
//             },
//             include: {
//                 author: {
//                     select: {
//                         id: true,
//                         username: true,
//                         avatar: true
//                     }
//                 }
//             }
//         });

//         res.json(comments);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to get comments' });
//     }
// };