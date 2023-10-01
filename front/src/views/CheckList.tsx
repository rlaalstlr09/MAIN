import React, {Component} from 'react';
import './css/CheckList.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function CheckPage() {
    return (
        <div className="App">
            <h4>체크리스트</h4><br/>
            <div className="Button">
                <Button variant="contained" className="write" component={Link} to="/check/write">체크리스트 작성</Button>
                    
             </div>
        </div>
    );
}