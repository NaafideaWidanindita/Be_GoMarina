// Import Express
const express = require('express');
const app = express();

// Tentukan port
const port = 3000;

// Buat route untuk halaman utama
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
