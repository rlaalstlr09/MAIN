import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Modal } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PlannerModalProps {
    open: boolean;
    onClose: () => void;
    planId: number | null;
    plannerId: number | null;
  }

  interface Plan{
    date:Date;
    place:string;
    start_time:string;
    end_time:string;
    todo:string;
    memo:string;
    
  }

  interface Planner{
    date:Date;
  }
  
  const PlannerModal: React.FC<PlannerModalProps> = ({ open, onClose, planId, plannerId }) => {
    const [plan, setPlan] = useState<Plan | null>(null);
    const [planners, setPlanners] = useState<Planner | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget as HTMLElement);
      };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    useEffect(() => {
      if (planId) {
        axios.get(`http://localhost:8080/api/planner/plan/${planId}`, { withCredentials: true })
          .then(response => {
            setPlan(response.data);
          })
          .catch(error => console.error('There was an error!', error));
      }
    }, [planId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/planner/${plannerId}`,{
          withCredentials: true
      })
          .then(response => {
            setPlanners(response.data);
          })
          .catch(error => console.error('There was an error!', error));
      }, []);

      const modalStyle = {
        position: 'absolute',
        display: 'flex',  
        flexDirection: 'column', 
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        gap: 2,
        width: 500,
        height: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };
    

 
    return (
        <Modal
          open={open}
          onClose={onClose}
        >
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton aria-label="menu"
              onClick={handleClick}
              sx={{
                position: 'absolute',
                right: 8,
                top: 45,
                color: (theme) => theme.palette.grey[500],
              }} aria-haspopup="true" color='success'>
                  <MoreVertIcon  color='info'/>
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to={`/money/write?date=${planners?.date}&place=${plan?.place}`}>예산관리 작성</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to={`/check?place=${plan?.place}`}>체크리스트 작성</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to={`/map?keyword=${plan?.place}`}>지도 검색</Link>
                    </MenuItem>
                  </Menu>
               
            <h2>{plan?.todo}</h2>
            <p>• 시간: {plan?.start_time} ~ {plan?.end_time}</p>
            <p>• 장소: {plan?.place}</p>
            <p>• 메모: {plan?.memo}</p>
            {/* 여기에 추가적인 상세 정보를 표시할 수 있습니다. */}
          </Box>
        </Modal>
      );
};

export default PlannerModal;