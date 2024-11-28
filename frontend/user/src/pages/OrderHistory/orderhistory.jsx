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
        const response = await axios.get(`https://api.menu-care.com/api/orders/history`, {
          params: { customer_id: 1 },
          headers: {
            Authorization: sessionStorage.getItem("idToken"),
          }
        });

        setOrders(response.data);
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
  height: 100%;
  font-size: 18px;
  color: #555;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BackButton = styled.button`
  flex: 1; 
  padding: 15px 0; 
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  color: #fff;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  text-align: center;
  background: linear-gradient(90deg, #f2994a, #f2c94c); 
  }
`;

export default OrderHistory;
