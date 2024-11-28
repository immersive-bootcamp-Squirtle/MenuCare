import styled from "styled-components";

const CartItem = ({ item }) => {
  const itemTotal = Math.floor(item.price) * item.quantity; // 合計価格を計算

  return (
    <Item>
      <ItemImage src={item.image_url} alt={item.name} />
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemAllergies>{item.allergies.join(", ")}</ItemAllergies>
        <ItemQuantity>数量: {item.quantity}</ItemQuantity>
        <ItemPrice>価格: ¥{itemTotal.toLocaleString()}</ItemPrice>
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
  font-size: 16px;
  color: #333;
  margin: 0; 
`;

const ItemPrice = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0; 
`;

export default CartItem;
