
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleCheck, faMapLocationDot, faSackDollar } from '@fortawesome/free-solid-svg-icons';


export default function MainPage() {
  
    const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="outline">
      <div className="title-image">
        <img id = "main-image" src="main-image8.jpg" alt = "메인 이미지"/>
      <div className='title'>
        <h1 id="main-title">PlanIt</h1>
        <p className='main-info'>"PlanIt"은 손쉽게 여행 계획을 세울 수 있도록 지도와 달력 기능을 제공합니다.</p>
        <p className='main-info'>체크리스트로 할 일을 관리하고 예산관리 기능으로 지출 내역을 쉽게 파악할 수 있습니다.</p>
      </div>
      </div>
      <div className='button-container'>
      

        <Button variant="outlined" className="main-button" onClick={() => navigate('/map')}>
          <div className='button-content'>
          <div><b>지도</b></div>
          <hr className='btn-hr'/>
          <small>가고싶은 여행지 / 숙소 / 식당을 찾아보세요!</small>
          </div>
          <FontAwesomeIcon className='icon-style' icon={faMapLocationDot} />
          </Button>
        <Button variant="outlined" className="main-button" onClick={() => navigate('/calendar')}>
          
          <div className='button-content'>
          <div><b>계획표</b></div>
          <hr className='btn-hr'/>
          <small>여행계획을 편하게 작성하고 관리해보세요!</small>
          </div>
          <FontAwesomeIcon className='icon-style' icon={faCalendarDays} />
        </Button>
    
     
        <Button variant="outlined" className="main-button" onClick={() => navigate('/check')}>
        <div className='button-content'>
          <div><b>체크리스트</b></div>
          <hr className='btn-hr'/>
          <small>해야 할 일들을 작성하고 관리해보세요!</small>
          </div>
          <FontAwesomeIcon className='icon-style' icon={faCircleCheck} />
        </Button>
        
        <Button variant="outlined" className="main-button" onClick={() => navigate('/money')}>
        <div className='button-content'>
          <div><b>예산관리</b></div>
          <hr className='btn-hr'/>
          <small>여행예산을 날짜별로 관리해보세요!</small>
          </div>
          <FontAwesomeIcon className='icon-style' icon={faSackDollar} />
        </Button>
        </div>
        </div>
    </div>
   
  );

}

