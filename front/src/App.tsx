import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import MapPage from './views/viewPage/MainMap';
import CalendarPage from './views/viewPage/Calendar';
import PWritePage from './views/writePage/PlannerWrite';
import CWritePage from './views/writePage/CheckListWrite'
import CheckPage from './views/viewPage/CheckList'
import MWritePage from './views/writePage/MoneyManagerWrite'
import MoneyPage from './views/viewPage/MoneyManager'
import PlannerPage from './views/viewPage/Planner'

export default function LabTabs() {
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
            <Tab label="Main" component={Link} to="/main" />
            <Tab label="계획표" component={Link} to="/calendar" />
            <Tab label="체크리스트" component={Link} to="/check" />
            <Tab label="예산관리" component={Link} to="/money" />
          </TabList>
        </Box> 
       
          <Routes>
            <Route path="/main" element={<MapPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/planner/write" element={<PWritePage />} />
            <Route path="/calendar/planner/:id" element={<PlannerPage />} />
            <Route path="/check" element={<CheckPage />} />
            <Route path="/check/write" element={<CWritePage />} />
            <Route path="/money" element={<MoneyPage />} />
            <Route path="/money/write" element={<MWritePage />} />
          </Routes>
        
      </TabContext>
    </Box>
    </Router>
  );
}