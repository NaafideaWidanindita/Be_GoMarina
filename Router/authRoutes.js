const express = require("express");
const { signUp, signIn, updateUser, deleteUser } = require("../Controller/authController");

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/signin", signIn);
authRoutes.put("/updateUser/:id", updateUser); // Tambahkan :id untuk menerima ID dari URL
authRoutes.delete("/signin", deleteUser); // Route untuk delete user

module.exports = authRoutes;
