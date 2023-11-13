import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../Login/LogoutButton";
import '../css/Header.css'
import axios from "axios";
import GoogleLoginModal from "../Login/GoogleLoginButton";

export default function Header() {
    const [value, setValue] = React.useState('1');
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    try {
        await axios.get('http://localhost:8080/api/logout', { withCredentials: true });
        alert('로그아웃 되었습니다.');
        setIsLogin(false);
        setName('');
    } catch (error) {
        console.error('로그아웃 에러', error);
    }
};

    const [isLogin, setIsLogin] = React.useState(false);
    const [name, setName] = React.useState('');

    const LoginHandler= async () => {
        setLoginModalOpen(true);
    }

    const LoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/session', { withCredentials: true });
            if (response.status === 200) {
                setIsLogin(true);
                setName(response.data.name);
            } 
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    React.useEffect(() => {
        LoginStatus();
    }, []);

return(
<Box sx={{  width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Box className="tab-list">
                                    <Link to="/"> {/* 로고 클릭 시 루트 경로로 이동 */}
                                    <img className="logo" src="Logo.png" alt="logo" />
                                    </Link>
                                    <Tab label="지도" component={Link} to="/map" />
                                    <Tab label="계획표" component={Link} to="/calendar" />
                                    <Tab label="체크리스트" component={Link} to="/check" />
                                    <Tab label="예산관리" component={Link} to="/money" />
                                    <Box sx={{width:'100px', marginLeft:'180%'}}>
                                    {isLogin ? (
                                        <>
                                        <LogoutButton onLogout={handleLogout} />
                                        <span>{name} 님 환영합니다. </span>
                                        </>
                                         
                                    ): (
                                        <>
                                        <Button variant="contained" onClick={ LoginHandler}>로그인</Button>
                                        <GoogleLoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
                                        </>
                                    )}
                                    </Box> 

                                </Box>
                            </Box>
                        </TabList>

                        
                    </Box> 
                </TabContext>
            </Box>
)
}