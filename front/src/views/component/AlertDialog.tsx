import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

interface AlertDialogProps {
  open: boolean;
  title: string;
  content: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, title, content, handleClose, handleConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handleConfirm} autoFocus>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
