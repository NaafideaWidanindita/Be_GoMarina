const express = require('express');
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const acaraRoutes = require('./routes/acaraRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const path = require('path');
const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.use(cors(corsOptions));

// Middleware untuk parsing JSON
app.use(express.json());

// Contoh route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/products', productRoutes)
app.use('/api/acaras', acaraRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
