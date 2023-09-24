import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './css/CheckListWrite.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function CWritePage() {
    return (
     
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h4>체크리스트 작성</h4>
            <TextField fullWidth label="할 일" id="_todo" />
            <TextField fullWidth label="시간" id="_time" />
            <TextField fullWidth label="장소" id="_place" />
            <Button variant="contained" className="write" component={Link} to="/money">저장</Button>
        </Box>
    );
  }