import React from "react";
import styled from "styled-components";
import OrderItem from "./OrderItem";
import dayjs from "dayjs";

const OrderList = ({ orders }) => {
  const calculateOrderTotal = (order) =>
    order.items.reduce(
      (sum, item) => sum + item.quantity * item.total_price,
      0
    );

  const calculateOverallTotal = (orders) => {
    const subtotal = orders.reduce(
      (sum, order) => sum + calculateOrderTotal(order),
      0
    );
    const tax = Math.floor(subtotal * 0.1);
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = calculateOverallTotal(orders);

  return (
    <Container>
      <List>
        {orders.map((order) => (
          <Card key={order.order_id}>
            <OrderDate>
              {dayjs(order.date).format("YYYY/MM/DD HH:mm")}
            </OrderDate>
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </Card>
        ))}
      </List>
      <Footer>
        <Summary>
          <SummaryRow>合計: ¥{subtotal.toLocaleString()}</SummaryRow>
          <SummaryRow>消費税: ¥{tax.toLocaleString()}</SummaryRow>
          <SummaryTotal>総合計: ¥{total.toLocaleString()}</SummaryTotal>
        </Summary>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  height: calc(100vh - 150px);
  padding-bottom: 0;
  margin-bottom: 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  padding-top: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const OrderDate = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  text-align: left;
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #f9f4ee;
  padding: 15px 10px;
  border-top: 1px solid #ddd;
  margin: 0;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

const SummaryRow = styled.p`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const SummaryTotal = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
`;

export default OrderList;
