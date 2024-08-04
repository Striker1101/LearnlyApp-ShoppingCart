const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "cat";

const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.header("Authorization");

  // Check if the Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract the token part from "Bearer <token>"
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request object
    req.user = decoded.user;
    console.log(req.user); // For debugging purposes, can be removed in production

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.log(err); // For debugging purposes, can be removed in production
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = verifyToken;
