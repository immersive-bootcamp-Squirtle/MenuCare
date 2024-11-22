import styled from "styled-components";
import { useRecoilState } from "recoil";
import { globalStateTest } from "../../globalState/globalStateTest";
import MenuList from "../../components/Menu/MenuList";
import NavBar from "../../components/Menu/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import AllergyFilterModal from "../../components/allergyFilterModal/allergyFilterModal";

function Menu() {
  // Global Stateの利用例です
  const [test, setTest] = useRecoilState(globalStateTest);
  const [menuItems, setMenuItems] = useState([]);

  const [allergies, setAllergies] = useState([]); // アレルギー情報を管理
  const [selectedAllergies, setSelectedAllergies] = useState([]); // 選択されたアレルギーを管理


  // モーダルの開閉状態を管理
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // アレルギーの選択状態を管理
  const handleToggleAllergy = (allergyId) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId)
        ? prev.filter((id) => id !== allergyId) 
        : [...prev, allergyId] 
    );
  };

  console.log("Global State Testです。");
  console.log(test);

  useEffect(() => {
    try {
      const fetchMenuItems = async () => {
        // const res = await axios.get(`${baseUrl}/restaurants/1/menus`);
        // setMenuItems(res.data);
        // backendを繋げていない環境では以下を利用してください。
        const testData = [
          {
            menu_id: 1,
            name: "Sample Menu 1",
            price: "1000.00",
            image_url: "sample/path",
            allergies: ["卵", "小麦"],
          },
          {
            menu_id: 2,
            name: "Sample Menu 2",
            price: "1500.00",
            image_url: "sample/path",
            allergies: ["小麦"],
          },
          {
            menu_id: 3,
            name: "Sample Menu 3",
            price: "800.00",
            image_url: "sample/path",
            allergies: ["乳（牛乳）"],
          },
        ];
        setMenuItems(testData);
      };
      fetchMenuItems();
    } catch (err) {
      console.log("error");
    }
  }, []);

  console.log("menuItems:", menuItems);


 // アレルギー情報を取得する関数
 useEffect(() => {
  const fetchAllergies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/allergies`);
      setAllergies(res.data);
    } catch (err) {
      console.error("Error fetching allergies:", err);

      // backendを繋げていない環境では以下を利用します。
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
    }
  };

  fetchAllergies();
}, []);

console.log("allergies:", allergies);

  return (

      <Frame>
        <NavBar openModal={openModal} /> {/* NavBar にモーダル開閉状態を渡す */}
        <MenuList items={menuItems} />

        {isModalOpen && (
        <AllergyFilterModal
          onClose={closeModal}
          allergies={allergies}
          selectedAllergies={selectedAllergies}
          onToggle={handleToggleAllergy} // onToggleとして渡す
        />
      )}
      </Frame>

  );
}

const Frame = styled.div`
  border: 2px solid #000000;
  width: min(98vw, 98vh * 0.75);
  overflow: hidden;
`;

export default Menu;
