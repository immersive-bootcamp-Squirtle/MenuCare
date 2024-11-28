const knex = require('../../db/knex');

// 注文を挿入する関数
async function insertOrder(orderData) {
  try {
    // トランザクションとして処理する
    const result = await knex.transaction(async (trx) => {
      const insertedOrders = [];

      for (const item of orderData.order_items) {
        // 配列内の各注文アイテムを1つずつ処理
        const [order] = await trx('orders')
          .insert({
            table_id: orderData.table_id,
            menu_id: item.menu_id,
            quantity: item.quantity,
            customer_id: orderData.customer_id,
            created_at: knex.fn.now(),
          })
          .returning([
            'order_id',
            'table_id',
            'menu_id',
            'quantity',
            'customer_id',
            'created_at',
          ]);
        insertedOrders.push(order);
      }

      return insertedOrders;
    });

    return result;
  } catch (error) {
    console.error('Failed to insert order:', error);
    throw new Error('Failed to insert order');
  }
}

// 注文履歴を取得する関数
async function fetchOrderHistory(customer_id) {
  try {
    const orders = await knex('orders')
      .join('menus', 'orders.menu_id', '=', 'menus.menu_id')
      .select(
        'orders.order_id',
        'orders.created_at as date',
        'orders.quantity',
        'menus.menu_name as name',
        'menus.image_url',
        knex.raw('orders.quantity * menus.price as total_price') // 合計金額を計算
      )
      .where('orders.customer_id', customer_id)
      .orderBy('orders.created_at', 'desc');

    const groupedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find((o) => o.order_id === order.order_id);
      if (existingOrder) {
        existingOrder.items.push({
          name: order.name,
          quantity: order.quantity,
          image_url: order.image_url,
          total_price: order.total_price, // 合計金額
        });
      } else {
        acc.push({
          order_id: order.order_id,
          date: order.date,
          items: [
            {
              name: order.name,
              quantity: order.quantity,
              image_url: order.image_url,
              total_price: order.total_price, // 合計金額
            },
          ],
        });
      }
      return acc;
    }, []);

    return groupedOrders;
  } catch (error) {
    console.error('Failed to fetch order history:', error);
    throw new Error('注文履歴の取得に失敗しました');
  }
}

// 修正: 1つのエクスポートに統一
module.exports = {
  insertOrder,
  fetchOrderHistory,
};
