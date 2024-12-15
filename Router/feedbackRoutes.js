const express = require("express");
const { tambahFeedback, ambilDataFeedback, ambilFeedbackId, perbaruiFeedback, hapusFeedback, tambahFeedback, ambilDataFeedback, ambilFeedbackId, perbaruiFeedback, hapusFeedback } = require("../Controller/feedback");

const feedbackRoutes = express();

feedbackRoutes.post("/feedback", tambahFeedback);
feedbackRoutes.get("/feedback", ambilDataFeedback);
feedbackRoutes.get("/feedback/:id", ambilFeedbackId);
feedbackRoutes.put("/feedback/:id", perbaruiFeedback);
feedbackRoutes.delete("/feedback/:id", hapusFeedback);

module.exports = feedbackRoutes;