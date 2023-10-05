import React, {Component, useEffect, useState} from 'react';
import '../css/MoneyManager.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

interface MoneyManager {
    id: number;
    date: string;
    place: string;
    in_money: string;
    out_money:string;
    head_count:string;

  }

export default function MoneyPage() {
    const [moneyManager, setMoneyManager] = useState<MoneyManager[]>([]);
    const navigate = useNavigate();
  
    const handleClick = (info : any) => {
      navigate(`/calendar/money/${info.event.id}`);
    }
  
    useEffect(() => {
      axios.get(`http://localhost:8080/api/money`)
        .then(response => {
          setMoneyManager(response.data);
        })
        .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div className="App">    
            <h4>예산관리</h4><br/>
            {moneyManager.map(moneyManager =>
            <div key={moneyManager.id}>
                <br/>
                <p>Date : {moneyManager.date}</p>
                <p>Place : {moneyManager.place}</p>
                <p>inMoney : {moneyManager.in_money}</p>
                <p>outMoney : {moneyManager.out_money}</p>
                <p>headCount : {moneyManager.head_count}</p>
            </div>)}
            <div className="Button">
                <br/>
                <Button variant="contained" className="write" component={Link} to="/money/write">예산관리 작성</Button>
                    
             </div>
        </div>
    );
}