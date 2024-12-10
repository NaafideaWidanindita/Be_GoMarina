const path = require("path");
const express = require("express");

const staticMiddleware = express.static(path.join(__dirname, "..", "uploads", "images"));
module.exports = staticMiddleware;