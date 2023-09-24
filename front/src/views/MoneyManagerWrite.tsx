import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './css/CheckListWrite.css'
import { Link } from 'react-router-dom';
export default function MWritePage() {
    return (
     
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h4>예산관리 작성</h4>
            <TextField fullWidth label="장소" id="_place" />
            <TextField fullWidth label="일시" id="_time" />
            <TextField fullWidth label="사용금액" id="_outMoney" />
            <TextField fullWidth label="받은금액" id="_inMoney" />
            <TextField fullWidth label="인원 수" id="_count" />
            <Button variant="contained" className="write" component={Link} to="/money">저장</Button>
        </Box>
    );
  }