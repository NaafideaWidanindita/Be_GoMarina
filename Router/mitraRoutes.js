const express = require("express");
const { tambahMitra, perbaruiMitra, ambilDataMitra, hapusMitra, ambilMitraId } = require("../Controller/mitra");

const mitraRoutes = express();

mitraRoutes.post("/mitra", tambahMitra);
mitraRoutes.get("/mitra", ambilDataMitra);
mitraRoutes.get("/mitra/:id", ambilMitraId);
mitraRoutes.put("/mitra/:id", perbaruiMitra);
mitraRoutes.delete("/mitra/:id", hapusMitra);

module.exports = mitraRoutes;