const express = require("express");
const { tambahPayment, ambilDataPayment, ambilPaymentId, perbaruiPayment, hapusPayment, ubahStatusPayment, receiveFileUpload } = require("../Controller/payment");
const uploadMiddleware = require("../middleware/multer");

const paymentRoutes = express();

paymentRoutes.post("/payment", [uploadMiddleware, receiveFileUpload, tambahPayment]);
paymentRoutes.get("/payment", ambilDataPayment);
paymentRoutes.get("/payment/:id", ambilPaymentId);
paymentRoutes.put("/payment/:id", perbaruiPayment);
paymentRoutes.delete("/payment/:id", hapusPayment);
paymentRoutes.patch("/payment/:id/status", ubahStatusPayment);

module.exports = paymentRoutes;