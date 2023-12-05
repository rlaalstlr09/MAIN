import { Button, Fab, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FC, MouseEvent, useState } from "react";
import GoogleLoginModal from "../Login/GoogleLoginButton";
import { Add as AddIcon } from '@mui/icons-material';

interface WriteButtonProps {
    redirectPath: string;
    text:string;
}

const DateWriteButton: FC<WriteButtonProps> = ({ redirectPath, text })  => {
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
            <Button style={{textAlign:'left',paddingLeft: 0, fontSize:'15px',color:'black'}}onClick={handleWriteButton}>{text}</Button>
            <GoogleLoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
       
    </div>
    )
}
export default DateWriteButton;