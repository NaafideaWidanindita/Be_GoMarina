const express = require("express");
const { addCartItem, ambilDataCartItem, ambilCartItemId, perbaruiCartItem, hapusCartItem } = require("../Controller/cart_item");

const cartItemRoutes = express();

cartItemRoutes.post("/cart/:role_id/:product_id", addCartItem);
cartItemRoutes.get("/cart_item", ambilDataCartItem);
cartItemRoutes.get("/cart_item/:id", ambilCartItemId);
cartItemRoutes.put("/cart_item/:id", perbaruiCartItem);
cartItemRoutes.delete("/cart_item/:id", hapusCartItem);

module.exports = cartItemRoutes;