import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import styled from "styled-components";

const MenuList = ({items}) => {
  return (
    <>
      <h1>Menu List</h1>
      <MenuListFrame>
      {items.map((item) =>(
        <MenuItem key={item.id} item={item}/>
      ))}
      </MenuListFrame>
    </>
  );
};


const MenuListFrame = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;

export default MenuList;
