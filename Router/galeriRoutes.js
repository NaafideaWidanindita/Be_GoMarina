const express = require("express");
const { tambahGaleri, ambilDataGaleri, ambilGaleriId, perbaruiGaleri, hapusGaleri } = require("../Controller/galeri");
const upload = require("../middleware/multer"); 

const galeriRoutes = express();

galeriRoutes.post("/galeri", upload.single("image"), tambahGaleri);
galeriRoutes.get("/galeri", ambilDataGaleri);
galeriRoutes.get("/galeri/:id", ambilGaleriId);
galeriRoutes.put("/galeri/:id", perbaruiGaleri);
galeriRoutes.delete("/galeri/:id", hapusGaleri);

module.exports = galeriRoutes;