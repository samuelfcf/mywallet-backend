import { Router } from "express";
import { postUser } from "./controllers/UsersController.js";

const router = Router();

router.post("/sign-up", postUser);

export default router;