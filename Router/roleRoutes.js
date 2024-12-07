const express = require("express");
const { getUserById } = require("../Controller/role");

const roleRoutes = express.Router();

roleRoutes.get("/user/:id", getUserById);

module.exports = roleRoutes;
