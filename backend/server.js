const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const app = express()
const menuRoutes = require('./src/routes/menuRoutes')// ルートのインポート
const allergyRoutes = require('./src/routes/allergyRoutes')
const healthCheckRoutes = require('./src/routes/healthCheckRoutes')

//ミドルウェア
app.use(express.json());
app.use(cors({
    origin: ["https://www.menu-care.com", "https://admin.menu-care.com"],
    methods: "GET",
    allowedHeaders: "Content-Type,Authorization"
}))

//APIエンドポイント
app.use('/api/health_check', healthCheckRoutes)
app.use('/api/restaurants', menuRoutes);
app.use('/api/allergies', allergyRoutes);

module.exports = app