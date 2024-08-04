const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const UserModel = require("../mongo/model/user");
const jwt = require("jsonwebtoken");

// Replace with your own secret key
const JWT_SECRET = process.env.JWT_SECRET || "cat";

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await UserModel.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized credentials, User is not on our Database",
      });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized credentials, Password is not correct",
      });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: "5h" }, // Token expires in 5 hour
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            fullName: user.fullName,
            isAdmin: user.isAdmin,
            createdOn: user.createdOn,
          },
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.route("/register").post(
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await UserModel.findOne({ email });
      if (user) {
        console.log("user already created");
        return res.status(400).send({ msg: "User already exists" });
      }

      // Create a new instance of the User model
      user = new UserModel({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        password,
        isAdmin: false,
        createdOn: new Date().toLocaleString(),
      });

      // Hash the password before saving to the database
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user and check for errors

      await user.save();

      res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
