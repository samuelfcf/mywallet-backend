import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(4000, () => {
  console.clear();
  console.log("Server is running on port 4000");
});

