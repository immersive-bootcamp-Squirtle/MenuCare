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
    console.error('注文の挿入に失敗:', err.message, err.stack); // 詳細なエラーを出力
    res.status(500).json({ error: `注文の挿入に失敗: ${err.message}` }); // エラーメッセージを返す
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { customer_id } = req.query;

    if (!customer_id) {
      return res.status(400).json({ error: 'customer_idが不足しています' });
    }

    const orderHistory = await orderModel.fetchOrderHistory(customer_id);

    // 注文ごとの合計金額を計算
    const enrichedOrderHistory = orderHistory.map(order => {
      const totalAmount = order.items.reduce((sum, item) => sum + item.total_price, 0);
      return {
        ...order,
        totalAmount, // 合計金額を追加
      };
    });

    res.status(200).json(enrichedOrderHistory);
  } catch (err) {
    console.error('Failed to fetch order history:', err);
    res.status(500).json({ error: '注文履歴の取得に失敗しました' });
  }
};