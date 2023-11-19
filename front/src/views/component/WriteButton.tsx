import { Button, Fab } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FC, MouseEvent, useState } from "react";
import GoogleLoginModal from "../Login/GoogleLoginButton";
import { Add as AddIcon } from '@mui/icons-material';

interface WriteButtonProps {
    redirectPath: string;
}

const WriteButton: FC<WriteButtonProps> = ({ redirectPath })  => {
    const navigate = useNavigate();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleWriteButton = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            
            const response = await axios.get('http://localhost:8080/api/session', { 
                withCredentials: true ,
                validateStatus: function (status) {
                    return status < 300; // 3xx 응답을 오류로 취급합니다.
                }
            });

            if (response.status === 200) {
                
                navigate(redirectPath);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && (error.response.status === 401 || error.response.status === 302)) {
                    
                    setLoginModalOpen(true);
                }
            } else {
                
                console.error('작성 버튼 클릭 에러', error);
            }
        }
    };

    return(
        <div>
            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 100, right: 50 }} onClick={handleWriteButton}>
                <AddIcon />
            </Fab>
            <GoogleLoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </div>
    )
}
export default WriteButton;