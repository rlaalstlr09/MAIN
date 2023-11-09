import React, {Component, useEffect, useState} from 'react';
import '../css/MoneyManager.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import WriteButton from '../component/WriteButton';
import DeleteButton from '../component/DeleteButton';

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

    const handleWrite = async () => {        //나중에 삭제
        try {
            const response = await axios.get('http://localhost:8080/api/session', { withCredentials: true });
            if (response.data.email) {
                navigate('/check/write');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const getMoneyManager = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/check', { withCredentials: true });
            setMoneyManager(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        getMoneyManager();
    }, []);


    return (
        <div className="App"> 
        <div style={{ height: '60%', width: '60%' }}> 
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
                                    <DeleteButton id={item.id} getData={getMoneyManager} path="check" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
            <br/>
            <WriteButton redirectPath='/money/write'/>
        </div>
        </div>
        </div>
           
    );
}
