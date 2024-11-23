const express = require('express')
const morgan = require('morgan')
const app = express()
const menuRoutes = require('./src/routes/menuRoutes')// ルートのインポート
const allergyRoutes = require('./src/routes/allergyRoutes')
const healthCheckRoutes = require('./src/routes/healthCheckRoutes')

//ミドルウェア
app.use(express.json());

//APIエンドポイント
app.use('/api/health_check', healthCheckRoutes)
app.use('/api/restaurants', menuRoutes);
app.use('/api/allergies', allergyRoutes);

module.exports = app