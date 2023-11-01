import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../Login/Logout";

export default function Header() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  

return(
<Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="지도" component={Link} to="/map" />
                        <Tab label="계획표" component={Link} to="/calendar" />
                        <Tab label="체크리스트" component={Link} to="/check" />
                        <Tab label="예산관리" component={Link} to="/money" />
                        <Button variant="contained" className="write" component={Link} to="/">로그인</Button>  
                        <LogoutButton />
                        </TabList>

                        
                    </Box> 
                </TabContext>
            </Box>
)
}