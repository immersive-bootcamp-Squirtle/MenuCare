const orderModel = require('../models/orderModel');

exports.insertOrder = async (req, res) => {
  try {
    const { customer_id, table_id, order_items } = req.body;

    // 必須フィールドのチェック
    if (!customer_id || !table_id || !Array.isArray(order_items)) {
      return res.status(400).json({ error: '必須フィールドが不足' });
    }

    // DBに注文を挿入
    const orders = await orderModel.insertOrder({ customer_id, table_id, order_items });

    res.status(201).json(orders);
  } catch (err) {
    res.status(500).json({ error: '注文の挿入に失敗' });
  }
};