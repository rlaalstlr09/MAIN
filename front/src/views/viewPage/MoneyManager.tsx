import React, {Component} from 'react';
import '../css/CheckList.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function MoneyManagerPage() {
    return (
        <div className="App">    
            <h4>예산관리</h4><br/>
            <div className="Button">
                <Button variant="contained" className="write" component={Link} to="/money/write">예산관리 작성</Button>
                    
             </div>
        </div>
    );
}