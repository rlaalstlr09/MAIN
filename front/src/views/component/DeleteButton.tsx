import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import AlertDialog from "./AlertDialog";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
    id: number;
    getData: () => void;
    path: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, getData, path }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/${path}/${id}`, { withCredentials: true });
            alert('삭제 성공');
            getData();
        } catch (error) {
            console.error('삭제 에러', error);
        }
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}><DeleteIcon/></IconButton>
            <AlertDialog
                open={open}
                title="삭제 확인"
                content="정말로 삭제하시겠습니까?"
                handleClose={() => setOpen(false)}
                handleConfirm={handleDelete}
            />
        </div>
    );
};

export default DeleteButton;
