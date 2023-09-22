import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import MapPage from './views/MainMap';
import CalendarPage from './views/PlannerCalendar';

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
            <Tab label="계획표" component={Link} to="/planner" />
            <Tab label="체크리스트" component={Link} to="/chkList" />
            <Tab label="예산관리" component={Link} to="/money" />
          </TabList>
        </Box> 
        <Routes>
          <Route path="/main" element={<MapPage />} />
          <Route path="/planner" element={<CalendarPage />} />
        </Routes>
      </TabContext>
    </Box>
    </Router>
  );
}