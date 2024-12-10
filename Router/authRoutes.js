const express = require("express");
const { signUp, signIn } = require("../Controller/authController");

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/signin", signIn);

module.exports = authRoutes;
