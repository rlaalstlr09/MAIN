
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './views/viewPage/Main';
import CalendarPage from './views/ListPage/Calendar';
import PWritePage from './views/writePage/PlannerWrite';
import CWritePage from './views/writePage/CheckListWrite'
import CheckPage from './views/ListPage/AllCheckList'
import MWritePage from './views/writePage/MoneyManagerWrite'
import MoneyPage from './views/ListPage/AllMoneyManager'
import PlannerPage from './views/viewPage/Planner'
// import LoginBtnPage from './views/Login/LoginButton'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import React from 'react';
import LandingPage from './views/viewPage/MapLanding';

export default function App() {
  
  return (
    <Router>
       
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/map" element={<LandingPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/planner/write" element={<PWritePage />} />
            <Route path="/calendar/planner/:id" element={<PlannerPage />} />
            <Route path="/check" element={<CheckPage />} />
            <Route path="/check/write" element={<CWritePage />} />
            <Route path="/money" element={<MoneyPage />} />
            <Route path="/money/write" element={<MWritePage />} />
            {/* <Route path="/" element={<LoginBtnPage />} /> */}
          </Routes>
        
      
    </Router>
  );
}