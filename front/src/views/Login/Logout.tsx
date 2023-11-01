import { Button } from "@mui/material";
import axios from "axios";

const logout = async () => {
    try {
        await axios.get('http://localhost:8080/api/logout', { withCredentials: true });
        alert('로그아웃 되었습니다.');
        // 로그아웃 후 필요한 작업을 여기에 추가합니다.
    } catch (error) {
        console.error('로그아웃 에러', error);
    }
};

const LogoutButton = () => {
    return(
        <div>
            <div className="Button">
                <Button onClick={logout} variant="contained" className="logout">로그아웃</Button>  
            </div>
        </div>
    );
};

export default LogoutButton;