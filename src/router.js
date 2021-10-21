import { Router } from "express";
import { logIn, postUser } from "./controllers/UsersController.js";

const router = Router();

router.post("/sign-up", postUser);
router.post("/log-in", logIn)

export default router;