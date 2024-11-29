import styled from "styled-components";
import { Stack } from "@mui/material";

const CartItem = ({ item }) => {
  const itemTotal = Math.floor(item.price) * item.quantity; // 合計価格を計算

  return (
    <Item>
      <ItemImage src={item.image_url} alt={item.name} />
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemAllergies>{item.allergies.join(", ")}</ItemAllergies>
        <ItemQuantity>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <ItemQuantityLabel>数量:</ItemQuantityLabel>{" "}
            <ItemQuantityDisplay>{item.quantity}</ItemQuantityDisplay>
          </Stack>
        </ItemQuantity>
        <ItemPrice>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <ItemPriceLabel>価格:</ItemPriceLabel>
            <ItemPriceDisplay>¥{itemTotal.toLocaleString()}</ItemPriceDisplay>
          </Stack>
        </ItemPrice>
      </ItemDetails>
    </Item>
  );
};

// スタイリング
const Item = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  text-align: left;
`;

const ItemName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #3c3a37;
  margin: 0;
`;

const ItemAllergies = styled.p`
  font-size: 16px;
  color: #e74c3c;
  margin: 0;
`;

const ItemQuantity = styled.p`
  color: #333;
  margin: 0;
`;
const ItemQuantityLabel = styled.p`
  font-size: 16px;
`;
const ItemQuantityDisplay = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const ItemPrice = styled.p`
  color: #333;
  margin: 0;
`;

const ItemPriceLabel = styled.p`
  font-size: 16px;
`;

const ItemPriceDisplay = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export default CartItem;
