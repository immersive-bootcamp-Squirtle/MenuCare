import styled from "styled-components";

const CartItem = ({ item }) => (
  <Item>
    <ItemImage src={item.image_url} alt={item.name} />
    <ItemDetails>
      <ItemName>{item.name}</ItemName>
      <ItemAllergies>{item.allergies.join(", ")}</ItemAllergies>
      <Price>¥{Math.floor(item.price)}</Price>
    </ItemDetails>
  </Item>
);

const Item = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #3c3a37;
`;

const ItemAllergies = styled.p`
  font-size: 14px;
  color: #e74c3c;
`;

const Price = styled.p`
  font-size: 18px;
  color: #333;
`;

export default CartItem;
