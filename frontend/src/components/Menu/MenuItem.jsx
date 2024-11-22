import React, { useEffect, useState } from "react";

const MenuItem = ({item}) => {
  return (
    <>
      <h2>{item.name}</h2>
      <p>{item.price}</p>
      <p>{item.allergies}</p>
    </>
  );
};

export default MenuItem;
