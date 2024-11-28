import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteConfirm({ item, dialogOpen, handleConfirmDelete, handleCloseDialog }) {
  return (
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>メニュー削除</DialogTitle>
      <DialogContent>
        <DialogContentText>"{item.name}" を削除しますか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary">
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirm;
