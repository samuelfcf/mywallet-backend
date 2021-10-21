import { Router } from "express";
import { logIn, postUser } from "./controllers/UsersController.js";
import ensureAuthenticated from "./middlewares/ensureAuthenticated.js";

const router = Router();

router.post("/sign-up", postUser);
router.post("/log-in", logIn);

router.get("/teste", ensureAuthenticated, async (req, res) => {
  res.send("Está autenticado!!!")
  console.log("oii")
})

export default router;