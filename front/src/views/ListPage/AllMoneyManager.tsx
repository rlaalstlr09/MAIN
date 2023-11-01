import React, {Component, useEffect, useState} from 'react';
import '../css/MoneyManager.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

interface MoneyManager {
    id: number;
    date: string;
    place: string;
    inMoney: number;
    outMoney:number;
    headCount:number;
}

export default function MoneyPage() {
    const [moneyManager, setMoneyManager] = useState<MoneyManager[]>([]);
    const navigate = useNavigate();

    const handleUpdate = async (id: number) => {
        navigate(`/money/update/${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/money/${id}`, { withCredentials: true });
            alert('삭제 성공');
            const response = await axios.get('http://localhost:8080/api/money', { withCredentials: true });
            setMoneyManager(response.data);
        } catch (error) {
            console.error('삭제 에러', error);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/money`, { withCredentials: true })
            .then(response => {
                setMoneyManager(response.data);
            })
            .catch(error => console.error('There was an error!', error));
    }, []);

    return (
        <div className="App"> 
        <div style={{ height: 400, width: '100%' }}> 
            <h4>예산관리</h4><br/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>날짜</TableCell>
                            <TableCell>장소</TableCell>
                            <TableCell>입금</TableCell>
                            <TableCell>출금</TableCell>
                            <TableCell>인원수</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {moneyManager.map((item: MoneyManager) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.place}</TableCell>
                                <TableCell>{item.inMoney}</TableCell>
                                <TableCell>{item.outMoney}</TableCell>
                                <TableCell>{item.headCount}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdate(item.id)}>수정</Button>
                                    <Button onClick={() => handleDelete(item.id)}>삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
            <br/>
            <Button variant="contained" className="write" component={Link} to="/money/write">예산관리 작성</Button>
        </div>
        </div>
        </div>
           
    );
}
