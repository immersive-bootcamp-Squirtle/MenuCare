module.exports = (req, res, next) => {
    // 処理
    console.log(`${req.method} ${req.menu}`)
    next()
  }