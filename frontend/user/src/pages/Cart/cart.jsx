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
          cartItems.map((item) => (
            <CartItem key={item.menu_id} item={item} />
          ))
        ) : (
          <EmptyMessage>カートに商品がありません</EmptyMessage>
        )}
      </CartContainer>
      <CartSummary subtotal={subtotal} tax={tax} totalPrice={totalPrice} />
      <CartActions
        onBack={handleBack}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </Frame>
  );
};


const Frame = styled.div`
  padding: 20px;
  background-color: #f9f4ee;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #3c3a37;
  margin-bottom: 10px;
`;

const CartContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
`;

export default Cart;
