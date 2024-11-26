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

function Menu() {
  // Global Stateの利用例です
  const [test, setTest] = useRecoilState(globalStateTest);
  const [menuItems, setMenuItems] = useState([]);

  // Local Stateを定義
  const [allergies, setAllergies] = useState([]); // アレルギー情報を管理
  const [selectedAllergies, setSelectedAllergies] = useState([]); // 選択されたアレルギーを管理
  const [selectedAllergiesOnFilter, setSelectedAllergiesOnFilter] = useState(
    []
  ); // filter上で選択中のアレルギー情報を管理

  // モーダルの開閉状態を管理
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    // modalを閉じる
    setModalOpen(false);
    // selectedAllergiesOnFilterをselectedAllergiesの値にリセットする ※ modalを開いた際の初期値を選択中のアレルギー情報にするため
    setSelectedAllergiesOnFilter(selectedAllergies);
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
        const res = await axios.get(`${baseUrl}/restaurants/1/menus`);
        setMenuItems(res.data);

        // lambda上での実行の際はこちら
        // const res = await axios.get(`https://api.menu-care.com/api/restaurants/1/menus`);
        // setMenuItems(res.data);

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
        const res = await axios.get(`${baseUrl}/allergies`);
        console.log("alg:", res.data);
        setAllergies(res.data);

        // lambda上での実行の際はこちら
        // const res = await axios.get(`https://api.menu-care.com/api/allergies`);
        // setAllergies(res.data);

        // backendを繋げていない環境ではこちら
        const testAllergies = [
          { allergy_id: 1, allergy_name: "卵" },
          { allergy_id: 2, allergy_name: "小麦" },
          { allergy_id: 3, allergy_name: "乳（牛乳）" },
          { allergy_id: 4, allergy_name: "えび" },
          { allergy_id: 5, allergy_name: "かに" },
          { allergy_id: 6, allergy_name: "くるみ" },
          { allergy_id: 7, allergy_name: "そば" },
          { allergy_id: 8, allergy_name: "落花生（ピーナッツ）" },
          { allergy_id: 9, allergy_name: "アーモンド" },
          { allergy_id: 10, allergy_name: "あわび" },
          { allergy_id: 11, allergy_name: "いか" },
          { allergy_id: 12, allergy_name: "いくら" },
          { allergy_id: 13, allergy_name: "オレンジ" },
          { allergy_id: 14, allergy_name: "カシューナッツ" },
          { allergy_id: 15, allergy_name: "キウイ" },
          { allergy_id: 16, allergy_name: "牛肉" },
          { allergy_id: 17, allergy_name: "ごま" },
          { allergy_id: 18, allergy_name: "さけ" },
          { allergy_id: 19, allergy_name: "さば" },
          { allergy_id: 20, allergy_name: "大豆" },
          { allergy_id: 21, allergy_name: "鶏肉" },
          { allergy_id: 22, allergy_name: "バナナ" },
          { allergy_id: 23, allergy_name: "豚肉" },
          { allergy_id: 24, allergy_name: "マカダミアナッツ" },
          { allergy_id: 25, allergy_name: "もも" },
          { allergy_id: 26, allergy_name: "やまいも" },
          { allergy_id: 27, allergy_name: "りんご" },
          { allergy_id: 28, allergy_name: "ゼラチン" },
        ];
        setAllergies(testAllergies);
      } catch (err) {
        console.error("Error fetching allergies:", err);
      }
    };

    fetchAllergies();
  }, []);

  console.log("allergies:", allergies);

  return (
    <Frame>
      <ThemeProvider theme={theme}>
        <NavBar openModal={openModal} /> {/* NavBar にモーダル開閉状態を渡す */}
        <MenuList items={menuItems} selectedAllergies={selectedAllergies} />
        {isModalOpen && (
          <AllergyFilterModal
            onClose={closeModal}
            allergies={allergies}
            selectedAllergies={selectedAllergies}
            selectedAllergiesOnFilter={selectedAllergiesOnFilter}
            onToggle={handleToggleAllergy} // onToggleとして渡す
            onClick={handleConfirmAllergy}
          />
        )}
      </ThemeProvider>
    </Frame>
  );
}

const Frame = styled.div`
  height: 100vh; // 全画面の高さを確保
  overflow: auto;
`;

export default Menu;
