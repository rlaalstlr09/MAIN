import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FC, MouseEvent, useState } from "react";
import GoogleLoginModal from "../Login/GoogleLoginButton";

interface WriteButtonProps {
    redirectPath: string;
}

const WriteButton: FC<WriteButtonProps> = ({ redirectPath })  => {
    const navigate = useNavigate();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleWriteButton = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            
            const response = await axios.get('http://localhost:8080/api/session', { withCredentials: true });

            if (response.status === 200) {
                
                navigate(redirectPath);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    
                    setLoginModalOpen(true);
                }
            } else {
                
                console.error('작성 버튼 클릭 에러', error);
            }
        }
    };

    return(
        <div>
            <Button variant="contained" onClick={handleWriteButton}>작성</Button>
            <GoogleLoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </div>
    )
}
export default WriteButton;