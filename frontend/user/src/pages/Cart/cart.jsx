import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import CartActions from "../../components/CartActions/CartActions";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // ローカルストレージからカートデータを取得
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart.length > 0 ? parsedCart : []);
      } catch (error) {
        console.error("Failed to parse cart data:", error);
        setCartItems([]);
      }
    }
  }, []);

  // 小計、消費税、合計金額を計算
  const subtotal = cartItems.reduce(
    (total, item) => total + Math.floor(item.price) * item.quantity,
    0
  );
  const tax = Math.floor(subtotal * 0.1);
  const totalPrice = subtotal + tax;

  // 戻るボタンの処理
  const handleBack = () => {
    navigate("/menu", { state: null });
  };

  return (
    <Frame>
      <Title>注文内容の確認</Title>
      <CartContainer>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.menu_id} item={item} />)
        ) : (
          <EmptyMessage>カートに商品がありません</EmptyMessage>
        )}
      </CartContainer>
      <CartBottomFixedContents>
        <CartSummary subtotal={subtotal} tax={tax} totalPrice={totalPrice} />
        <CartActions
          onBack={handleBack}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </CartBottomFixedContents>
    </Frame>
  );
};

// スタイリング
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f4ee;
  height: 100vh;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding-bottom: 120px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #3c3a37;
  margin-bottom: 20px;
`;

const CartContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: #f9f4ee;
  border-radius: 8px;
  padding: 15px;
`;

const CartBottomFixedContents = styled.div`
  // 合計金額がボタンに隠れないように追加
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background-color: #f9f4ee;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #756e68;
  margin-top: 20px;
`;

export default Cart;
