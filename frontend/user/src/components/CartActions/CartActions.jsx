import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartActions = ({ onBack, cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    try {
      // カートのアイテムを取得
      const orderData = {
        customer_id: 1, // 仮の顧客ID
        table_id: 1, // 仮のテーブルID
        order_items: cartItems.map((item) => ({
          menu_id: item.menu_id,
          quantity: item.quantity || 1, // 数量がない場合はデフォルトで1
        })),
      };

      console.log("Sending orderData:", orderData);

      // サーバーにリクエストを送信
      // local実行時はこちら
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        orderData
      );

      // lambda実行時はこちら
      // const response = await axios.post(
      //   `https://api.menu-care.com/api/orders`,
      //   orderData, {
      //     headers: {
      //       Authorization: sessionStorage.getItem("idToken"),
      //     }
      //   }
      // );

      console.log("Order placed successfully:", response.data);

      // カートをクリア
      setCartItems([]);
      localStorage.removeItem("cart");

      // メニュー画面に移動し、メッセージを表示
      navigate("/menu", { state: { message: "ご注文を承りました！" } });
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("注文時にエラーが発生しました。");
    }
  };

  return (
    <ActionsContainer>
      <BackButton onClick={onBack}>戻る</BackButton>
      <ConfirmButton onClick={handleConfirmOrder}>注文を確定する</ConfirmButton>
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  bottom: 30px;
  background-color: #f9f4ee;
  padding: 10px 20px;
  border-top: 1px solid #ddd;
  gap: 20px;
`;

const Button = styled.button`
  flex: 1; 
  padding: 15px 0; 
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  color: #fff;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  text-align: center;
`;

const BackButton = styled(Button)`
  background: linear-gradient(90deg, #f2994a, #f2c94c); 
`;

const ConfirmButton = styled(Button)`
  background: linear-gradient(90deg, #27ae60, #2ecc71); 
`;

export default CartActions;
