import { TabContext, TabList } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Main.css'

export default function MainPage() {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
    return (
        <div className="container">
        <Button className="button" variant="contained" onClick={() => navigate('/map')}>지도</Button>
        <Button className="button" variant="contained" onClick={() => navigate('/calendar')}>계획표</Button>
        <Button className="button" variant="contained" onClick={() => navigate('/check')}>체크리스트</Button>
        <Button className="button" variant="contained" onClick={() => navigate('/money')}>예산관리</Button>
    </div>
    );
};

