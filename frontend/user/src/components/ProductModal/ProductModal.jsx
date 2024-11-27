import React, { useState } from "react";
import styled from "styled-components";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  // 数量の増減を管理する
  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // カートに商品を追加する処理
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <StyledModal open={!!product} onClose={onClose}>
      <ModalContent>
        {/* ヘッダー */}
        <Header>
          <ProductName>{product?.name}</ProductName>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Header>

        {/* 商品画像 */}
        <ImageContainer>
          <Image src={product?.image_url} alt={product?.name} />
        </ImageContainer>

        {/* 商品情報と数量管理 */}
        <Content>
          <Price>価格: ¥{Math.trunc(product?.price)}</Price>
          <QuantitySection>
            <QuantityLabel>数量</QuantityLabel>
            <QuantitySelector>
              <QuantityButton onClick={() => handleQuantityChange("decrement")}>
                -
              </QuantityButton>
              <Quantity>{quantity}</Quantity>
              <QuantityButton onClick={() => handleQuantityChange("increment")}>
                +
              </QuantityButton>
            </QuantitySelector>
          </QuantitySection>
        </Content>

        {/* フッター */}
        <Footer>
          <TotalPrice>合計: ¥{Math.trunc(product?.price) * quantity}</TotalPrice>
          <AddToCartButton onClick={handleAddToCart}>
            カートに入れる
          </AddToCartButton>
        </Footer>
      </ModalContent>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  animation: slideUp 0.3s ease-out;
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  color: #333;
`;

const ProductName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;

const QuantitySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityButton = styled.button`
  background: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Quantity = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const QuantityLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;


const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const AddToCartButton = styled.button` 
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  color: #fff;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  text-align: center;
  background: linear-gradient(90deg, #f2994a, #f2c94c); 
`;

export default ProductModal;
