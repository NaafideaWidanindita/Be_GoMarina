const express = require("express");
const kontenRoutes = require("./kontenRoutes");
const mitraRoutes = require("./mitraRoutes");
const agendaRoutes = require("./agendaRoutes");
const galeriRoutes = require("./galeriRoutes");
const paymentRoutes = require("./paymentRoutes");
const cartItemRoutes = require("./cart_itemRoutes");

const Router = express();
const api = "/api/v1";
Router.use(api, kontenRoutes, mitraRoutes, agendaRoutes, galeriRoutes, paymentRoutes, cartItemRoutes);

module.exports = Router;