const express = require("express");
const {
    tambahPayment,
    ambilDataPayment,
    perbaruiPayment,
    hapusPayment,
} = require("../Controller/payment");
const upload = require("../middleware/multer"); 

const paymentRoutes = express.Router();

paymentRoutes.post("/payment", upload.single("image"), tambahPayment);

paymentRoutes.get("/payment", ambilDataPayment);
paymentRoutes.put("/payment/:id", perbaruiPayment);
paymentRoutes.delete("/payment/:id", hapusPayment);

module.exports = paymentRoutes;