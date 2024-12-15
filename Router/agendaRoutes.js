const express = require("express");
const { tambahAgenda, ambilDataAgenda, ambilAgendaId, perbaruiAgenda, hapusAgenda } = require("../Controller/agenda");
const upload = require("../middleware/multer");

const agendaRoutes = express();

agendaRoutes.post("/agenda", upload.single("image"), tambahAgenda);
agendaRoutes.get("/agenda", ambilDataAgenda);
agendaRoutes.get("/agenda/:id", ambilAgendaId);
agendaRoutes.put("/agenda/:id", perbaruiAgenda);
agendaRoutes.delete("/agenda/:id", hapusAgenda);

module.exports = agendaRoutes;