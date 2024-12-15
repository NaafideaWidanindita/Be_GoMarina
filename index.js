const express = require("express");
const path = require('path');
const cors = require("cors");
const dotenv = require("dotenv");
const { testConnection } = require("./Database/db.js");
const Router = require("./Router/index.js");

dotenv.config();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions)); 

app.use(express.json());
app.use('/api/v1/uploads/images', express.static(path.resolve(__dirname, 'uploads/images')));
app.use(Router);

app.listen(process.env.APP_PORT, async () => {
    await testConnection();
    console.log(`Server berjalan di http://localhost:${process.env.APP_PORT}`);
});