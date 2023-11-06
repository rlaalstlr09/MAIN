import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleLogout = () => {
      onLogout();
      setOpen(false);
    };

    return(
        <div>
            <div className="Button">
                <Button onClick={handleClickOpen} variant="contained" className="logout">로그아웃</Button>  
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"로그아웃 확인"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            정말로 로그아웃 하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>취소</Button>
                        <Button onClick={handleLogout} autoFocus>
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default LogoutButton;
