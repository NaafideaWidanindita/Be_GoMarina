const express = require("express");
const { tambahCartItem, ambilDataCartItem, ambilCartItemId, perbaruiCartItem, hapusCartItem } = require("../Controller/cart_item");

const cartItemRoutes = express();

cartItemRoutes.post("/cart_item", tambahCartItem);
cartItemRoutes.get("/cart_item", ambilDataCartItem);
cartItemRoutes.get("/cart_item/:id", ambilCartItemId);
cartItemRoutes.put("/cart_item/:id", perbaruiCartItem);
cartItemRoutes.delete("/cart_item/:id", hapusCartItem);

module.exports = cartItemRoutes;