import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend is live on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Error: ", e);
  });
