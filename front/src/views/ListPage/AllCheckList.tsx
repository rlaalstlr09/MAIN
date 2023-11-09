import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import WriteButton from '../component/WriteButton';
import DeleteButton from '../component/DeleteButton';

interface CheckList {
    id: number;
    todo: string;
    place: string; 
}



export default function CheckPage() {
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

    const handleUpdate = async (id: number) => {
      navigate(`/check/update/${id}`);
    };

    const handleDelete = async (id: number) => {        //나중에 삭제
        try {
            await axios.delete(`http://localhost:8080/api/check/${id}`, { withCredentials: true });
            alert('삭제 성공');
            const response = await axios.get('http://localhost:8080/api/check', { withCredentials: true });
            setCheckList(response.data);
        } catch (error) {
            console.error('삭제 에러', error);
        }
    };

    const handleWrite = async () => {       //나중에 삭제
        try {
            const response = await axios.get('http://localhost:8080/api/session', { withCredentials: true });
            if (response.status === 200) {
                navigate('/check/write');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
    const columns: GridColDef[] = [
      { field: 'id', headerName: '#', width: 70 },
      { field: 'todo', headerName: 'Todo', width: 130 },
      { field: 'place', headerName: 'Place', width: 130 },
      {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          renderCell: (params: GridRenderCellParams) => {
              const id = params.row.id;
              return (
                  <>
                       <Button onClick={() => handleUpdate(id)}>수정</Button>
                       <DeleteButton id={id} getData={getCheckList} path="check" />
                  </>
              );
          },
      },
  ];

    
    return (
        <div className="App">
            <div style={{ height: '60%', width: '60%' }}>
                <h4>체크리스트</h4><br/>
                <DataGrid
                    rows={checkList}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
                <div className="Button">
                <WriteButton redirectPath='/check/write'/>
             </div>
            </div>
            
            
        </div>
    );
}
