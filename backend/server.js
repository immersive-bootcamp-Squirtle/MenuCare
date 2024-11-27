const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const app = express()

const menuRoutes = require('./src/routes/menuRoutes')// ルートのインポート
const allergyRoutes = require('./src/routes/allergyRoutes')
const healthCheckRoutes = require('./src/routes/healthCheckRoutes')
const orderRoutes = require('./src/routes/orderRoutes'); // orders ルート

//ミドルウェア : cors
app.use(express.json());
app.use(cors({
    origin:  ["https://admin.menu-care.com", "https://www.menu-care.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type,Authorization"
}))

// ミドルウェア : cors preflight
const allowCrossDomain = function(req, res, next) {
    if (req.header.origin === "https://www.menu-care.com") {
        res.header('Access-Control-Allow-Origin', 'https://www.menu-care.com')
    }
    if (req.header.origin === "https://admin.menu-care.com") {
        res.header('Access-Control-Allow-Origin', 'https://admin.menu-care.com')
    } 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
  
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200)
    } else {
      next()
    }
  }
app.use(allowCrossDomain)


//APIエンドポイント
app.use('/api/health_check', healthCheckRoutes)
app.use('/api/restaurants', menuRoutes);
app.use('/api/allergies', allergyRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app