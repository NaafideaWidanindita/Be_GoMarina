import express from 'express';
import cors from 'cors';
import FileUpload from 'express-fileupload';
import db from "./database/db.js";
import kontenRouter from "./routes/KontenRoutes.js";
import roleRouter from "./routes/RoleRoutes.js";
import productRouter from "./routes/ProductRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";
import sistemRoutes from "./routes/SistemRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(FileUpload());

app.use(kontenRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(roleRouter);
app.use(sistemRoutes);

app.use(express.static("public"));

app.listen(5001,() => console.log("Server gomarina is running"));

(async () => {
  try {
    await db.sync();
    console.log("synced with database!");
  } catch (error) {
    console.error("Failed to sync :", error);
  }
})();
