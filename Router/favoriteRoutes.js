const express = require("express");
const { addFavorite,getFavoriteProducts } = require("../Controller/favorite");

const favoriteRoutes = express.Router();

favoriteRoutes.post("/fav/:role_id/:product_id", addFavorite);
favoriteRoutes.get("/fav", getFavoriteProducts);

// Ekspor router
module.exports = favoriteRoutes;
