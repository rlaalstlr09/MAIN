import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios, { AxiosError } from 'axios';
import WriteButton from '../component/WriteButton';
import DeleteButton from '../component/DeleteButton';
import './css/ListPage.css';
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface CheckList {
    id: number;
    todo: string;
    place: string; 
    checked:boolean;
}



export default function CheckPage() {

    const { id } = useParams();  // URL의 경로 파라미터에서 ID를 가져옵니다.
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const initialPlace = queryParams.get('place') || '';
  
    const [place, setPlace] = useState(initialPlace);
    const [todo, setTodo] = useState('');
    const [allChecked, setAllChecked] = useState<boolean>(false);

      const updateAllCheckStatus = async (checked: boolean) => {
        try {
          // 모든 체크리스트의 체크 상태를 업데이트하는 API를 호출합니다.
          await axios.put('http://localhost:8080/api/check/checked/all', { checked }, { withCredentials: true });
        } catch (error) {
          console.error('There was an error!', error);
        }
      };

      const handleCheckAll = async () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);
        setCheckList(checkList.map(item => ({ ...item, checked: newAllChecked })));
      
        // 백엔드에 모든 체크리스트의 체크 상태를 업데이트합니다.
        await updateAllCheckStatus(newAllChecked);
      };

    const [checkList, setCheckList] = useState<CheckList[]>([]);
    const navigate = useNavigate();

    const getCheckList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/check', { withCredentials: true });
            setCheckList(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        getCheckList();
    }, []);

    const updateCheckStatus = async (id: number, checked: boolean) => {
        try {
          // 체크 여부를 변경하는 API를 호출합니다.
          // 이 API는 체크리스트 항목의 ID와 변경된 체크 여부를 인자로 받습니다.
          await axios.put(`http://localhost:8080/api/check/checked/${id}`, { checked }, { withCredentials: true });
        } catch (error) {
          console.error('There was an error!', error);
        }
      };

    const handleCheck = async (id: number) => {
        const newCheckStatus = !checkList.find(item => item.id === id)?.checked;
        setCheckList(checkList.map(item => 
          item.id === id ? { ...item, checked: newCheckStatus } : item
        ));
        
        // 체크 여부를 백엔드에 업데이트합니다.
        await updateCheckStatus(id, newCheckStatus);
      };

    const handleUpdate = async (id: number) => {
      navigate(`/check/update/${id}`);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8080/api/check', {
              place,
              todo,
              
            },{
                withCredentials: true
            });

             if (response.status === 200) { // HTTP 상태 코드가 성공을 의미하는 경우
                alert('저장되었습니다.'); // 서버로부터 받은 메시지를 alert 창으로 출력
                navigate(`/check`);
      }
            
            setPlace('');
            setTodo('');

            getCheckList();
        } catch (error) {
            console.error('체크리스트 작성 에러', error);
            if ((error as AxiosError).response && (error as AxiosError).response?.data) { 
                alert((error as AxiosError).response?.data); // 에러 메시지를 alert 창으로 출력
            }
         }
       };
    

    
    return (
        <div className="App">
            <div className="outline">
            <Box
            component="form"
            sx={{ m: 1, width: '80%', margin: '0 auto', marginTop: '4%' }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
                <h1>체크리스트</h1><br/>
                <div className="input-text">
                
                <TextField fullWidth label="할 일" id="_todo" value={todo} onChange={e=> setTodo(e.target.value)}/>
                <TextField fullWidth label="장소" id="_place" value={place} onChange={e=> setPlace(e.target.value)}/>
                <IconButton type='submit' size='large' color='inherit'><AddBoxOutlinedIcon style={{fontSize:'55px'}}/></IconButton>
                </div>
                
                {checkList.length > 0 ? (
                  <div className='checklist-table'>
                    <Table className='check-table'>
                        <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox 
                                size='medium'
                                checked={allChecked}
                                onChange={handleCheckAll}/>
                            </TableCell>
                            <TableCell align='center' width={'300px'}><big>할 일</big></TableCell>
                            <TableCell align='center' width={'300px'}><big>장소</big></TableCell>
                            <TableCell align='center'></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {checkList.map(item =>
                            <TableRow key={item.id} className='checklist'>
                            <TableCell>
                                <Checkbox
                                checked={item.checked} 
                                onChange={() => handleCheck(item.id)}
                                />
                            </TableCell>
                            <TableCell align='center'>{item.todo}</TableCell>
                            <TableCell align='center'>{item.place}</TableCell>
                            <TableCell align='center' style={{display:'flex'}}>
                            <Button onClick={() => handleUpdate(item.id)}>수정</Button>
                        
                                <DeleteButton id={item.id} getData={getCheckList} path="check" />
                            </TableCell>
                            </TableRow>
                            
                        )}
                        </TableBody>
                    </Table>
                    </div>
                    ) : (
                      <div className='alt'>
                    <FontAwesomeIcon className='alt-icon' icon={faCircleXmark} />
                    <p>작성된 체크리스트가 없습니다.</p>
                    </div>
                    )}
                  
            </Box>
            </div>
            
        </div>
    );
}
