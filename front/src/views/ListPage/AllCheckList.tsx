import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface CheckList {
    id: number;
    todo: string;
    place: string; 
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'todo', headerName: 'Todo', width: 130 },
    { field: 'place', headerName: 'Place', width: 130 },
];

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
            
            
            <div style={{ height: 400, width: '100%' }}>
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
            </div>
            
            <div className="Button">
                <Button variant="contained" className="write" component={Link} to="/check/write">체크리스트 작성</Button>  
             </div>
        </div>
    );
}
