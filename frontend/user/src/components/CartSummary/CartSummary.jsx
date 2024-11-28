import styled from "styled-components";

const CartSummary = ({ subtotal, tax, totalPrice }) => (
  <Container>
    <SummaryItem>
      <Label>小計:</Label>
      <Value>¥{subtotal.toLocaleString()}</Value>
    </SummaryItem>
    <SummaryItem>
      <Label>消費税:</Label>
      <Value>¥{tax.toLocaleString()}</Value>
    </SummaryItem>
    <Total>
      <Label>総合計:</Label>
      <TotalPrice>¥{totalPrice.toLocaleString()}</TotalPrice>
    </Total>
  </Container>
);

const Container = styled.div`
  margin-bottom: 50px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f4ee;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between; 
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 15px;
  color: #e74c3c; 
`;

const Label = styled.span`
  text-align: left; 
  font-weight: bold;
`;

const Value = styled.span`
  text-align: right;
`;

const TotalPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export default CartSummary;
