import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../Login/LogoutButton";
import './css/Header.css'
import axios from "axios";
import GoogleLoginModal from "../Login/GoogleLoginButton";
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

export default function Header() {
    
   
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const location = useLocation();

    let selectedTabIndex;
    if(location.pathname.startsWith('/map')) selectedTabIndex = 1;
    else if(location.pathname.startsWith('/calendar')) selectedTabIndex = 2;
    else if(location.pathname.startsWith('/check')) selectedTabIndex = 3;
    else if(location.pathname.startsWith('/money')) selectedTabIndex = 4;
    else selectedTabIndex = false;


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
    
    <Box style={{ backgroundColor: '#000035' }} sx={{  width: '100vw', typography: 'body1'}}>
        <div className="header">
        <Tabs value={selectedTabIndex} >
            <Link to="/"> {/* 로고 클릭 시 루트 경로로 이동 */}
                <img className="logo" src="Logo4.png" alt="logo" />
            </Link>
                              
            <Tab style={{ marginRight: '30px', fontSize:'15px', color:'#fffff0' }} icon={<MapOutlinedIcon />} label="지도" component={Link} to="/map" />
            <Tab style={{ marginRight: '30px', fontSize:'15px', color:'#fffff0' }} icon={<CalendarMonthOutlinedIcon/>}label="계획표" component={Link} to="/calendar" />
            <Tab style={{ marginRight: '30px', fontSize:'15px', color:'#fffff0' }} icon={<CheckBoxOutlinedIcon/>}label="체크리스트" component={Link} to="/check" />
            <Tab style={{ marginRight: '30px', fontSize:'15px', color:'#fffff0' }} icon={<LocalAtmOutlinedIcon/>}label="예산관리" component={Link} to="/money" />
           
            <div className="login">
                {isLogin ? (
                    <>
                    <LogoutButton onLogout={handleLogout} />
                    <span style={{marginTop: '3px'}}>{name} 님 환영합니다. </span>                        
                    </>
                    ): (
                    <>
                    <Button variant="contained" onClick={ LoginHandler}>Login</Button>
                    <GoogleLoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
                    </>
                    )}
            </div>
        </Tabs>    
        </div>        
    </Box>
            
)
}
