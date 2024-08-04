require("dotenv").config({ path: ".env.development" });

const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("MONGODB_URI is not defined in the .env file");
  process.exit(1);
}

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;
