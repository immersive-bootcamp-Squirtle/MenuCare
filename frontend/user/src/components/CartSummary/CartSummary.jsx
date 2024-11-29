import styled from "styled-components";

const CartSummary = ({ subtotal, tax, totalPrice }) => (
  <CartSummaryContainer>
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
  </CartSummaryContainer>
);

const CartSummaryContainer = styled.div`
  background-color: #f9f4ee;
  width: 100%;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #f9f4ee;
  border: 2px solid #dbd6cd;
  border-radius: 2em;
  width: clamp(17.5rem, 3.75rem + 68.75vw, 31.25rem);
  max-width: 600px;
  margin: 15px auto;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #3c3a37;
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
