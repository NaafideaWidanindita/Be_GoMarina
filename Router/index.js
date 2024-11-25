const express = require("express");
const authRoutes = require("./authRoutes");
const kontenRoutes = require("./kontenRoutes");
const mitraRoutes = require("./mitraRoutes");
const agendaRoutes = require("./agendaRoutes");
const galeriRoutes = require("./galeriRoutes");
const paymentRoutes = require("./paymentRoutes");
const cartItemRoutes = require("./cart_itemRoutes");

const Router = express();
const api = "/api/v1";
Router.use(api,authRoutes, kontenRoutes, mitraRoutes, agendaRoutes, galeriRoutes, paymentRoutes, cartItemRoutes);

module.exports = Router;