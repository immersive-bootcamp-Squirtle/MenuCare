const knex = require('../../db/knex');

// 注文を挿入する関数
module.exports = {
    async insertOrder(orderData) {
    try {
        // トランザクションとして処理する
        const result = await knex.transaction(async (trx) => {
            const insertedOrders = [];

            for (const item of orderData.order_items) {//配列内の各注文アイテムを1つずつ処理
                const [order] = await trx('orders')
                    .insert({
                        table_id: orderData.table_id,
                        menu_id: item.menu_id,
                        quantity: item.quantity,
                        customer_id: orderData.customer_id,
                        created_at: knex.fn.now(),
                    })
                    .returning(['order_id', 'table_id', 'menu_id', 'quantity', 'customer_id', 'created_at']);
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
};

