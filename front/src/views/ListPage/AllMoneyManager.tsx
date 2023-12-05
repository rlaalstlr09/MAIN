import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WriteButton from '../component/WriteButton';
import DeleteButton from '../component/DeleteButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './css/ListPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface MoneyManager {
    id: number;
    date: string;
    place: string;
    inMoney: number;
    outMoney:number;
    headCount:number;
}

function Row(props: { date: string, data: MoneyManager[],total: number, handleUpdate: (id: number) => void, getMoneyManager: () => void }) {
    const { date, data, total, handleUpdate, getMoneyManager } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    
                                    <TableCell>장소</TableCell>
                                    <TableCell align="right">출금</TableCell>
                                    <TableCell align="right">인원수</TableCell>
                                    <TableCell align="right">인당 지출</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row">{item.place}</TableCell>
                                        <TableCell align="right">{item.outMoney}</TableCell>
                                        <TableCell align="right">{item.headCount}</TableCell>
                                        <TableCell align="right">{item.outMoney / item.headCount}원</TableCell>
                                        <TableCell align="right" style={{display:'flex'}}>
                                            <DeleteButton id={item.id} getData={getMoneyManager} path="money" />
                                            <Button onClick={() => handleUpdate(item.id)}>수정</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function MoneyPage() {
    const [moneyManager, setMoneyManager] = useState<MoneyManager[]>([]);
    const navigate = useNavigate();

    const handleUpdate = async (id: number) => {
        navigate(`/money/update/${id}`);
    };

    const getMoneyManager = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/money', { withCredentials: true });
            setMoneyManager(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        getMoneyManager();
    }, []);

    const groupedData = moneyManager.reduce((acc: { [date: string]: MoneyManager[] }, item) => {
        (acc[item.date] = acc[item.date] || []).push(item);
        return acc;
    }, {});

    return (
        <div className="App"> 
        <div className='outline'> 
        <Box
            sx={{ m: 1, width: '80%', margin: '0 auto', mt: "4%" }}>
            <h1>예산관리</h1><br/>
            <div className='alt'>
            {Object.keys(groupedData).length > 0 ? (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell><big>날짜</big></TableCell>
                            <TableCell><big>총 지출</big></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.entries(groupedData).map(([date, data]) => {
                        const totalExpenditure = data.reduce((sum, item) => sum + item.outMoney, 0);
                        return (
                            <Row key={date} date={date} data={data} total={totalExpenditure} handleUpdate={handleUpdate} getMoneyManager={getMoneyManager} />
                        );
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
            ) : (
                <>
                <FontAwesomeIcon className='alt-icon' icon={faCircleXmark} />
                <p>작성된 예산관리가 없습니다.</p>
                </>
              )}
              </div>
            <div>
            <br/>
            <WriteButton redirectPath='/money/write'/>
        </div>
        </Box>
        </div>
        </div>
    );
}
