import React from "react";
import styled from "styled-components";

const OrderItem = ({ item }) => {
  const itemTotal = item.quantity * item.total_price;

  return (
    <ItemContainer>
      <Image src={item.image_url} alt={item.name} />
      <Details>
        <Name>{item.name}</Name>
        <Quantity>数量: {item.quantity}</Quantity>
        <Price>小計: ¥{itemTotal.toLocaleString()}</Price>
      </Details>
    </ItemContainer>
  );
};

// スタイリング
const ItemContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  gap: 5px; 
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const QuantityAndPrice = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 3px; 
`;

const Quantity = styled.p`
  font-size: 14px;
  margin: 0;
  color: #555;
`;

const Price = styled.p`
  font-size: 14px;
  margin: 0;
  color: #555;
`;

export default OrderItem;