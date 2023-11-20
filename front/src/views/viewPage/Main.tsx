
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Main.css';

export default function MainPage() {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="main-container">
      <div className="title-image">
        <img id = "main-image" src="main-image.png" alt = "메인 이미지"/>
      <div className='title'>
        <h1 id="main-title">PlanIt</h1>
        <b>여행계획을 편하게 작성하고 관리하세요!</b>
      </div>
      </div>
      <div className='button-container'>
      <div className="vertical-divider" />
      <div className="row">
      

        <Button variant="outlined" className="main-button" onClick={() => navigate('/map')}>
          <div className='button-content'>
          <div><b>지도</b></div>
          <hr className='btn-hr'/>
          <small>가고싶은 여행지 / 숙소 / 식당을 찾아보세요.</small>
          </div>

          </Button>
        <Button variant="outlined" className="main-button" onClick={() => navigate('/calendar')}>
          
          <div className='button-content'>
          <div><b>계획표</b></div>
          <hr className='btn-hr'/>
          <small></small>
          </div>

        </Button>
     </div>
      <hr className="horizontal-divider" />
      <div className="row">
        <Button variant="outlined" className="main-button" onClick={() => navigate('/check')}>
        <div className='button-content'>
          <div><b>체크리스트</b></div>
          <hr className='btn-hr'/>
          <small></small>
          </div>
        </Button>
        
        <Button variant="outlined" className="main-button" onClick={() => navigate('/money')}>
        <div className='button-content'>
          <div><b>예산관리</b></div>
          <hr className='btn-hr'/>
          <small></small>
          </div>
        </Button>
    </div>
    </div>
    </div>
  );

}

