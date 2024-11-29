import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderList from "../../components/OrderHistory/OrderList";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // local上での実行はこちら
        // const response = await axios.get(`${baseUrl}/orders/history`, {
        //   params: { customer_id: 1 },
        // });

        // lambda上での実行はこちら
        const response = await axios.get(
          `https://api.menu-care.com/api/orders/history`,
          {
            params: { customer_id: 1 },
            headers: {
              Authorization: sessionStorage.getItem("idToken"),
            },
          }
        );

        setOrders(response.data);

        //backendがつながっていない場合
        // const testData = [
        //   {
        //     order_id: 1,
        //     date: "2024-11-22 11:11:11",
        //     items: [
        //       {
        //         name: "目玉焼き",
        //         quantity: 1,
        //         image_url: "src/assets/egg.png",
        //         total_price: "1000.00",
        //       },
        //       {
        //         name: "目玉焼き",
        //         quantity: 1,
        //         image_url: "src/assets/egg.png",
        //         total_price: "1000.00",
        //       },
        //       {
        //         name: "生ハムのサラダ",
        //         quantity: 1,
        //         image_url: "src/assets/salad.png",
        //         total_price: "800.00",
        //       },
        //     ],
        //   },
        //   {
        //     order_id: 1,
        //     date: "2024-11-22 11:11:11",
        //     items: [
        //       {
        //         name: "目玉焼き",
        //         quantity: 2,
        //         image_url: "src/assets/egg.png",
        //         total_price: "1000.00",
        //       },
        //     ],
        //   },
        // ];
        // setOrders(testData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [baseUrl]);

  const handleBack = () => {
    navigate("/menu");
  };

  if (loading) {
    return <LoadingContainer>注文履歴を読み込んでいます...</LoadingContainer>;
  }

  return (
    <Frame>
      <Title>注文履歴</Title>
      <OrderList orders={orders} />
      <Footer>
        <BackButton onClick={handleBack}>戻る</BackButton>
      </Footer>
    </Frame>
  );
};

// スタイリング
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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 18px;
  color: #555;
`;

const Footer = styled.div`
  // スマホから見ると「戻る」ボタンが下すぎて見えなかった問題の解消
  display: flex;
  justify-content: center;
  bottom: 30px;
  background-color: #f9f4ee;
  padding-top: 15px;
  padding-bottom: 25px;
  border-top: 2px solid #dbd6cd;
  gap: 20px;
  width: 100%;
`;

const BackButton = styled.button`
  width: clamp(9.375rem, 0.804rem + 42.86vw, 11.25rem); // ボタン幅の調整
  padding: 15px 0;
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  cursor: pointer;
  text-align: center;
  // ボタンのスタイル変更
  color: #dbd6cd;
  background: #fff;
  border: 0.15em solid #dbd6cd;
  border-radius: 2em;
`;

export default OrderHistory;
