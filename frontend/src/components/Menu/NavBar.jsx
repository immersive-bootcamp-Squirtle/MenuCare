import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const NavBar = ({toggleTodo}) => {
    return (
        <>
        <Stack spacing={2} direction="row">
            <h1>メニュー一覧</h1>
        </Stack>
        <Stack spacing={2} direction="row">
            <Button variant="outlined" >すべて</Button>
            <Button variant="outlined">フード</Button>
            <Button variant="outlined">ドリンク</Button>
        </Stack>
        <Stack spacing={2} direction="row">
            <Button variant="outlined" onChange={(e) => toggleTodo(id, e.target.checked)}>アレルギーあり</Button>
            <Button variant="outlined">食事制限あり</Button>
        </Stack>
        </>
    )
}

export default NavBar;