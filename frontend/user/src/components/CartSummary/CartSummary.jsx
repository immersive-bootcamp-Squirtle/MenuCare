import styled from "styled-components";

const CartSummary = ({ subtotal, tax, totalPrice }) => (
  <Container>
    <SummaryItem>
      <span>小計</span>
      <span>¥{subtotal}</span>
    </SummaryItem>
    <SummaryItem>
      <span>消費税</span>
      <span>¥{tax}</span>
    </SummaryItem>
    <Total>
      <span>総合計</span>
      <TotalPrice>¥{totalPrice}</TotalPrice>
    </Total>
  </Container>
);

const Container = styled.div`
  margin-bottom: 50px;
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
  font-weight: bold;
  margin-top: 20px;
  color: #e74c3c;
`;

const TotalPrice = styled.span`
  font-size: 22px;
  font-weight: bold;
`;

export default CartSummary;
