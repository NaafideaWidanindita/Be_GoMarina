const express = require("express");
const { signUp, signIn, updateUser, deleteUser, updateAddress, getAddressByRoleId} = require("../Controller/authController");

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/signin", signIn);
authRoutes.put("/updateUser/:id", updateUser);
authRoutes.delete("/signin", deleteUser);
authRoutes.put("/updateAddress/:role_id", updateAddress);
authRoutes.get('/address', getAddressByRoleId);

module.exports = authRoutes;
