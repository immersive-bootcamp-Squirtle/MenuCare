import styled from "styled-components";
import { useRecoilState } from "recoil";
import { globalStateTest } from "../../globalState/globalStateTest";

function Menu() {
  // Global Stateの利用例です
  const [test, setTest] = useRecoilState(globalStateTest);
  console.log("Global State Testです。");
  console.log(test);
  return (
    <>
      <h1>Menuページです</h1>
    </>
  );
}

export default Menu;
