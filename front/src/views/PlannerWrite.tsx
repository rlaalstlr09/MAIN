import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function PWritePage() {
    return (
     
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h4>계획표 작성</h4>
            <TextField fullWidth label="제목" id="_title" />
            <TextField fullWidth label="할 일" id="_todo" />
            <TextField fullWidth label="시작 시간" id="_startTime" /> ~ <TextField fullWidth label="끝 시간" id="_endTime" />
            <TextField fullWidth label="장소" id="_place" />
            <TextField fullWidth label="메모" id="_memo" />
            <Button variant="contained" className="write" component={Link} to="/money">저장</Button>
        </Box>
    );
  }