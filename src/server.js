import app from "./app.js";
import './setup.js'


app.listen(process.env.PORT || 4000, () => {
  console.clear();
  console.log(`Env: ${process.env.NODE_ENV}`)
  console.log(`Server is running on port ${process.env.PORT}`);
});