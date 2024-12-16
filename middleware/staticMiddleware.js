const path = require("path");
const express = require("express");

console.log('Serving static files from:', path.resolve(__dirname, 'uploads/images'));
app.use('/api/v1/uploads/images', express.static(path.resolve(__dirname, 'uploads/images')));
app.use('/product', express.static(path.join(__dirname, 'uploads/imagesproduct'))); 
module.exports = staticMiddleware;