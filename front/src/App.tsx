
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './views/viewPage/Main';
import MapPage from './views/viewPage/Map';
import CalendarPage from './views/ListPage/Calendar';
import PWritePage from './views/writePage/PlannerWrite';
import CWritePage from './views/writePage/CheckListWrite'
import CheckPage from './views/ListPage/AllCheckList'
import MWritePage from './views/writePage/MoneyManagerWrite'
import MoneyPage from './views/ListPage/AllMoneyManager'
import PlannerPage from './views/viewPage/Planner'
import LoginPage from './views/Login/Login'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import React from 'react';

export default function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  setValue(newValue);
};

  return (
    <Router>
       <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="지도" component={Link} to="/map" />
                        <Tab label="계획표" component={Link} to="/calendar" />
                        <Tab label="체크리스트" component={Link} to="/check" />
                        <Tab label="예산관리" component={Link} to="/money" />
                        </TabList>
                    </Box> 
                </TabContext>
            </Box>
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/planner/write" element={<PWritePage />} />
            <Route path="/calendar/planner/:id" element={<PlannerPage />} />
            <Route path="/check" element={<CheckPage />} />
            <Route path="/check/write" element={<CWritePage />} />
            <Route path="/money" element={<MoneyPage />} />
            <Route path="/money/write" element={<MWritePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        
      
    </Router>
  );
}