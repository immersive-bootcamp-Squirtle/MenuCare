import styled from "styled-components";
import { useRecoilState } from "recoil";
import { globalStateTest } from "../../globalState/globalStateTest";
import MenuList from "../../components/Menu/MenuList";
import NavBar from "../../components/Menu/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import AllergyFilterModal from "../../components/allergyFilterModal/allergyFilterModal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductModal from "../../components/ProductModal/ProductModal";
import { useLocation } from "react-router-dom";

function Menu() {
  // Global Stateの利用例です
  const [test, setTest] = useRecoilState(globalStateTest);

  // Menu Item
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]); // カートの状態を管理
  const [selectedProduct, setSelectedProduct] = useState(null); // 選択された商品
  const [isProductModalOpen, setProductModalOpen] = useState(false);

  // Allergy
  const [allergies, setAllergies] = useState([]); // アレルギー情報を管理
  const [selectedAllergies, setSelectedAllergies] = useState([]); // 選択されたアレルギーを管理
  const [selectedAllergiesOnFilter, setSelectedAllergiesOnFilter] = useState(
    []
  ); // filter上で選択中のアレルギー情報を管理
  const [isModalOpen, setModalOpen] = useState(false);

  // カテゴリ選択
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  // カテゴリ変更時のハンドラー
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // カテゴリに基づいてフィルタリング
  const filteredMenuItems = Array.isArray(menuItems)
  ? menuItems.filter((item) => item.category_name === selectedCategory)
  : [];

  //popup
  const location = useLocation(); // `navigate` からのメッセージ受け取り
  const [popupMessage, setPopupMessage] = useState(""); // ポップアップメッセージを管理

  //ポップアップの表示処理
  useEffect(() => {
    if (location.state?.message) {
      setPopupMessage(location.state.message);

      // 3秒後にポップアップを非表示
      const timer = setTimeout(() => setPopupMessage(""), 3000);
      return () => clearTimeout(timer); // クリーンアップ
    }
  }, [location.state]);

  // カート情報のローカルストレージ保存と取得
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data:", error);
        setCartItems([]);
      }
    }
  }, []);

  // アレルギーモーダルの開閉状態を管理
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    // modalを閉じる
    setModalOpen(false);
    // selectedAllergiesOnFilterをselectedAllergiesの値にリセットする ※ modalを開いた際の初期値を選択中のアレルギー情報にするため
    setSelectedAllergiesOnFilter(selectedAllergies);
  };

  // 商品モーダルの開閉状態を管理
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setProductModalOpen(false);
  };

  // カートに商品追加
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.menu_id === product.menu_id
      );
      if (existingItem) {
        return prev.map((item) =>
          item.menu_id === product.menu_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    closeProductModal();
  };

  // アレルギーの選択状態を管理
  const handleToggleAllergy = (allergyName) => {
    setSelectedAllergiesOnFilter((prev) =>
      prev.includes(allergyName)
        ? prev.filter((name) => name !== allergyName)
        : [...prev, allergyName]
    );
  };

  // アレルギーのフィルタ上での選択状態を管理
  const handleConfirmAllergy = (e) => {
    e.preventDefault();
    // filter上で選択された値である selectedAllergiesOnFilter を selectedAllergies に入れる
    setSelectedAllergies(selectedAllergiesOnFilter);
    // modalを閉じる
    setModalOpen(false);
  };

  // Menuページ全体のフォントを管理
  const theme = createTheme({
    typography: {
      fontFamily: ['"Noto Sans JP"', '"Open Sans"', "Arial", "sans-serif"].join(
        ","
      ),
    },
  });

  useEffect(() => {
    try {
      const fetchMenuItems = async () => {
        // local実行の際はこちら
        // const res = await axios.get(`${baseUrl}/restaurants/1/menus`);
        // setMenuItems(res.data);

        // lambda上での実行の際はこちら
        const res = await axios.get(`https://api.menu-care.com/api/restaurants/1/menus`, {
          headers: {
            Authorization: sessionStorage.getItem("idToken"),
          }
        });
        setMenuItems(res.data);

        // backendを繋げていない環境ではこちら
        // const testData = [{"menu_id":1,"name":"目玉焼き","price":"1000.00","image_url":"src/assets/egg.png","allergies":["卵"]},{"menu_id":2,"name":"ガトーショコラ","price":"1500.00","image_url":"src/assets/cake.png","allergies":["卵","小麦","乳（牛乳）"]},{"menu_id":3,"name":"生ハムのサラダ","price":"800.00","image_url":"src/assets/salad.png","allergies":["卵","乳（牛乳）"]},{"menu_id":4,"name":"鶏肉のごま味噌焼き","price":"800.00","image_url":"src/assets/chicken.png","allergies":["ごま","鶏肉"]},{"menu_id":5,"name":"トマトパスタ","price":"1000.00","image_url":"src/assets/pasta.png","allergies":["小麦"]},{"menu_id":6,"name":"エビチリ","price":"700.00","image_url":"src/assets/ebichiri.png","allergies":["えび"]}];
        // setMenuItems(testData);
      };
      fetchMenuItems();
    } catch (err) {
      console.log("error");
    }
  }, []);

  // console.log("menuItems:", menuItems);

  // アレルギー情報を取得する関数
  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        // local上での実行の際はこちら
        // const res = await axios.get(`${baseUrl}/allergies`);
        // console.log("alg:",res.data);
        // setAllergies(res.data);

        // lambda上での実行の際はこちら
        const res = await axios.get(`https://api.menu-care.com/api/allergies`, {
          headers: {
            Authorization: sessionStorage.getItem("idToken"),
          }
        });
        setAllergies(res.data);

        // backendを繋げていない環境ではこちら
        // const testAllergies = [
        //   { allergy_id: 1, allergy_name: "卵" },
        //   { allergy_id: 2, allergy_name: "小麦" },
        //   { allergy_id: 3, allergy_name: "乳（牛乳）" },
        //   { allergy_id: 4, allergy_name: "えび" },
        //   { allergy_id: 5, allergy_name: "かに" },
        //   { allergy_id: 6, allergy_name: "くるみ" },
        //   { allergy_id: 7, allergy_name: "そば" },
        //   { allergy_id: 8, allergy_name: "落花生（ピーナッツ）" },
        //   { allergy_id: 9, allergy_name: "アーモンド" },
        //   { allergy_id: 10, allergy_name: "あわび" },
        //   { allergy_id: 11, allergy_name: "いか" },
        //   { allergy_id: 12, allergy_name: "いくら" },
        //   { allergy_id: 13, allergy_name: "オレンジ" },
        //   { allergy_id: 14, allergy_name: "カシューナッツ" },
        //   { allergy_id: 15, allergy_name: "キウイ" },
        //   { allergy_id: 16, allergy_name: "牛肉" },
        //   { allergy_id: 17, allergy_name: "ごま" },
        //   { allergy_id: 18, allergy_name: "さけ" },
        //   { allergy_id: 19, allergy_name: "さば" },
        //   { allergy_id: 20, allergy_name: "大豆" },
        //   { allergy_id: 21, allergy_name: "鶏肉" },
        //   { allergy_id: 22, allergy_name: "バナナ" },
        //   { allergy_id: 23, allergy_name: "豚肉" },
        //   { allergy_id: 24, allergy_name: "マカダミアナッツ" },
        //   { allergy_id: 25, allergy_name: "もも" },
        //   { allergy_id: 26, allergy_name: "やまいも" },
        //   { allergy_id: 27, allergy_name: "りんご" },
        //   { allergy_id: 28, allergy_name: "ゼラチン" },
        // ];
        // setAllergies(testAllergies);
      } catch (err) {
        console.error("Error fetching allergies:", err);
      }
    };

    fetchAllergies();
  }, []);

  console.log("allergies:", allergies);

  return (
    <Frame>
      <NavBar
        cartItemCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )} // カート内の数量合計
        openModal={openModal}
        onCategoryChange={handleCategoryChange} // カテゴリ変更ハンドラーを渡す
      />
      {/* ポップアップメッセージ */}
      {popupMessage && <Popup>{popupMessage}</Popup>}

      <MenuList
        items={menuItems}
        onItemClick={openProductModal}
        selectedAllergies={selectedAllergies}
        selectedCategory={selectedCategory} // 選択カテゴリを渡す
      />
      {isModalOpen && (
        <AllergyFilterModal
          onClose={closeModal}
          allergies={allergies}
          selectedAllergies={selectedAllergies}
          selectedAllergiesOnFilter={selectedAllergiesOnFilter}
          onToggle={(allergy) => {
            setSelectedAllergiesOnFilter((prev) =>
              prev.includes(allergy)
                ? prev.filter((a) => a !== allergy)
                : [...prev, allergy]
            );
          }}
          onClick={(e) => {
            e.preventDefault();
            setSelectedAllergies(selectedAllergiesOnFilter);
            setModalOpen(false);
          }}
        />
      )}
      {isProductModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={closeProductModal}
          onAddToCart={addToCart}
        />
      )}
    </Frame>
  );
}

const Frame = styled.div`
  height: 100vh; // 全画面の高さを確保
  overflow: auto;
`;

const Popup = styled.div`
  width: 250px;
  height: 180;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Noto Sans JP", sans-serif;
  background: linear-gradient(90deg, #f2994a, #f2c94c);
  color: #fff;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  z-index: 1000;
`;

export default Menu;
