import React, { useEffect, useState } from 'react'
import Map from './Map';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import './css/Map.css';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export interface propsType {
  searchKeyword: string
}

const LandingPage = ():JSX.Element => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialKeyword = queryParams.get('keyword') || '';
  const [Value, setValue] = useState(initialKeyword);
  const [Keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    setValue(initialKeyword);
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const keywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const submitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(Value);
  }

  const valueChecker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (Value === "") {
      alert ("검색어를 입력해주세요.")
    }  else {
      setKeyword(Value);
    }
  }

  return (
    <div className="landing-page">
      <div className="landing-page__inner">
        <div className="search-form-container">
          <form className="search-form" onSubmit={submitKeyword}>
            <label htmlFor="place" className="form__label">
              <TextField id='movie-title' InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton className='btn' onClick={valueChecker}>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    ),
  }}value={Value} className='form_input' name="place" onChange={keywordChange} placeholder="검색어를 입력해주세요." required />
            </label>
          </form>
        </div>
        <Map searchKeyword={Keyword} />
      </div>
    </div>
  )
}
export default LandingPage;