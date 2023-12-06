import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import AlertDialog from "../component/AlertDialog";
import { useNavigate } from "react-router";

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const handleLogout = () => {
      onLogout();
      setOpen(false);
      navigate('/');
    };

    return(
        <div>
            <div className="Button">
                <Button onClick={()=>setOpen(true)} variant="contained" className="logout">Logout</Button>  
                <AlertDialog
                open={open}
                title="로그아웃"
                content="정말로 로그아웃 하시겠습니까?"
                handleClose={() => setOpen(false)}
                handleConfirm={handleLogout}
                />
                
            </div>
            
        </div>
    );
};

export default LogoutButton;
