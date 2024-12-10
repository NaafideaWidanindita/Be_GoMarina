const express = require("express");
const {
    tambahPayment,
    ambilDataPayment,
    perbaruiPayment,
    hapusPayment,
} = require("../Controller/payment");
const upload = require("../middleware/multer"); // Middleware multer

const paymentRoutes = express.Router();

// Rute untuk menambahkan payment dengan unggah file
paymentRoutes.post("/payment", upload.single("image"), tambahPayment);

// Rute lainnya
paymentRoutes.get("/payment", ambilDataPayment);
paymentRoutes.put("/payment/:id", perbaruiPayment);
paymentRoutes.delete("/payment/:id", hapusPayment);

module.exports = paymentRoutes;