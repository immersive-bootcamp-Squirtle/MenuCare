import styled from "styled-components";
import { useRecoilState } from "recoil";
import { globalStateTest } from "../../globalState/globalStateTest";
import MenuList from "../../components/Menu/MenuList"
import NavBar from "../../components/Menu/NavBar"
import { useEffect,useState } from "react";
import axios from "axios"
const baseUrl = import.meta.env.VITE_API_BASE_URL

function Menu() {
  // Global Stateの利用例です
  const [test, setTest] = useRecoilState(globalStateTest);
  const [menuItems, setMenuItems] = useState([]);

  console.log("Global State Testです。");
  console.log(test);

  useEffect(() =>{
    try{
    const fetchMenuItems = async() =>{
      const res = await axios.get(`${baseUrl}/restaurants/1/menus`)
      setMenuItems(res.data)
      }
      fetchMenuItems()
    } catch(err) {
      console.log("error")
    }
  }, [])

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: completed };
        }
        return todo;
      });
    });
  }

  console.log("menuItems:",menuItems)
  return (
    <>
      <Frame>
        <NavBar toggleTodo={toggleTodo}/>
        <MenuList 
        items={menuItems}
        />
        <h1>Menuページです</h1>
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
