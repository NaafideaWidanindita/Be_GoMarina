const express = require("express");
const { tambahKonten, ambilDataKonten, perbaruiKonten, hapusKonten, ambilKontenId } = require("../Controller/konten");

const kontenRoutes = express();

kontenRoutes.post("/konten", tambahKonten);
kontenRoutes.get("/konten", ambilDataKonten);
kontenRoutes.get("/konten/:id", ambilKontenId);
kontenRoutes.put("/konten/:id", perbaruiKonten);
kontenRoutes.delete("/konten/:id", hapusKonten);

module.exports = kontenRoutes;