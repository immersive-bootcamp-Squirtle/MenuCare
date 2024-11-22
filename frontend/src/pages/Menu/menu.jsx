import styled from "styled-components";
import { useRecoilState } from "recoil";
import { globalStateTest } from "../../globalState/globalStateTest";
import AllergyFilterModal from "../../components/allergyFilterModal/allergyFilterModal";

function Menu() {
  // Global Stateの利用例です
  const [test, setTest] = useRecoilState(globalStateTest);
  console.log("Global State Testです。");
  console.log(test);
  return (
    <>
      <h1>Menuページです</h1>
      <AllergyFilterModal />
    </>
  );
}

export default Menu;
