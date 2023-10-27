import React, {Component, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

interface CheckList {
    id: number;
    todo: string;
    place: string; 
  }

export default function CheckPage() {
    const [checkList, setCheckList] = useState<CheckList[]>([]);
    const navigate = useNavigate();
  
    const handleClick = (info : any) => {
      navigate(`/calendar/check/${info.event.id}`);
    }
  
    useEffect(() => {
      axios.get(`http://localhost:8080/api/check`)
        .then(response => {
          setCheckList(response.data);
        })
        .catch(error => console.error('There was an error!', error));
    }, []);
  
    return (
        <div className="App">
            <h4>체크리스트</h4><br/>
            
            {checkList.map((item : CheckList)=>
            item.id && (
            <div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>todo</th>
                    <th>place</th>
                  </tr>
                </thead>
                {checkList.map((item:CheckList) =>
                (<tbody key={item.id}>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.todo}</td>
                    <td>{item.place}</td>
                  </tr>
                </tbody>)
                )}
              </table>
                
            </div>)
            )}
            
            <div className="Button">
                <Button variant="contained" className="write" component={Link} to="/check/write">체크리스트 작성</Button>
                    
             </div>
        </div>
    );
}