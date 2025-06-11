import { Router } from "express";
import { logout, signin, signup, verify_email } from "../controllers/userControllers";

export const UserRouter = Router();

UserRouter.post("/signup" , signup);
UserRouter.post("/signin" , signin);
UserRouter.post("/logout" , logout)
UserRouter.post("/verify-mail" , verify_email);