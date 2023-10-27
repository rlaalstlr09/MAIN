import React, {Component, useEffect, useState} from 'react';
import '../css/MoneyManager.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

interface MoneyManager {
    id: number;
    date: string;
    place: string;
    in_money: number;
    out_money:number;
    head_count:number;

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
            {moneyManager.map((item:MoneyManager) =>
            <div key={item.id}>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>날짜</th>
                    <th>장소</th>
                    <th>입금</th>
                    <th>출금</th>
                    <th>인원수</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.place}</td>
                    <td>{item.in_money}</td>
                    <td>{item.out_money}</td>
                    <td>{item.head_count}</td>
                    <td>
                      <form>
                        <input type="submit" name="update_" value="수정"></input>
                        <input type="submit" name="delete_" value="삭제"></input>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>)}
            <div className="Button">
                <br/>
                <Button variant="contained" className="write" component={Link} to="/money/write">예산관리 작성</Button>
                    
             </div>
        </div>
    );
}