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
  return (
    <>
      <Frame>
        <NavBar />
        <MenuList items={menuItems} />
        <AllergyFilterModal />
      </Frame>
    </>
  );
}

const Frame = styled.div`
  border: 2px solid #000000;
  width: min(98vw, 98vh * 0.75);
  overflow: hidden;
`;

export default Menu;
