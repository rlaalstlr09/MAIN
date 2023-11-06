
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './views/viewPage/Main';
import CalendarPage from './views/ListPage/Calendar';
import PWritePage from './views/writePage/PlannerWrite';
import CWritePage from './views/writePage/CheckListWrite'
import CheckPage from './views/ListPage/AllCheckList'
import MWritePage from './views/writePage/MoneyManagerWrite'
import MoneyPage from './views/ListPage/AllMoneyManager'
import PlannerPage from './views/viewPage/Planner'
import LoginBtnPage from './views/Login/GoogleLoginButton'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import React from 'react';
import LandingPage from './views/viewPage/MapLanding';
import Header from './views/fragments/Header'
import CUpdatePage from './views/updatePage/CheckListUpdate';
import MUpdatePage from './views/updatePage/MoneyManagerUpdate';
import PUpdatePage from './views/updatePage/PlannerUpdate';
import GoogleLogin from 'react-google-onetap';
import GoogleLoginButton from './views/Login/GoogleLoginButton';

export default function App() {
  
  return (
    <div>
      
    <Router>
      <Header />
       
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
            <Route path="/check/update/:id" element={<CUpdatePage />} />
            <Route path="/money/update/:id" element={<MUpdatePage />} />
            <Route path="/calendar/planner/update/:id" element={<PUpdatePage />} />
          </Routes>
        
      
    </Router>
    </div>
  );
}