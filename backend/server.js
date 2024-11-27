const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const app = express()

const menuRoutes = require('./src/routes/menuRoutes')// ルートのインポート
const allergyRoutes = require('./src/routes/allergyRoutes')
const healthCheckRoutes = require('./src/routes/healthCheckRoutes')
const orderRoutes = require('./src/routes/orderRoutes'); // orders ルート

//ミドルウェア
app.use(express.json());
app.use(cors({
    origin:  ["https://admin.menu-care.com", "https://www.menu-care.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type,Authorization"
}))

//APIエンドポイント
app.use('/api/health_check', healthCheckRoutes)
app.use('/api/restaurants', menuRoutes);
app.use('/api/allergies', allergyRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app