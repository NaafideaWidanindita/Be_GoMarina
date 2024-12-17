const express = require("express");
const kontenRoutes = require("./kontenRoutes");
const authRoutes = require("./authRoutes");
const mitraRoutes = require("./mitraRoutes");
const agendaRoutes = require("./agendaRoutes");
const galeriRoutes = require("./galeriRoutes");
const paymentRoutes = require("./paymentRoutes");
const cartItemRoutes = require("./cart_itemRoutes");
const productRoutes = require("./productRoutes");
const roleRoutes = require("./roleRoutes");
const favoriteRoutes = require("./favoriteRoutes");

const Router = express();
const api = "/api/v1";

Router.use(`${api}`, authRoutes);
Router.use(`${api}`, kontenRoutes);
Router.use(`${api}`, mitraRoutes);
Router.use(`${api}`, agendaRoutes);
Router.use(`${api}`, galeriRoutes);
Router.use(`${api}`, paymentRoutes);
Router.use(`${api}`, cartItemRoutes);
Router.use(`${api}`, productRoutes);
Router.use(`${api}`, roleRoutes);
Router.use(`${api}`, favoriteRoutes);

module.exports = Router;
