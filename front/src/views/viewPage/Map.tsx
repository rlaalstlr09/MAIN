import React, { useEffect, useState } from 'react';
import { propsType } from './MapLanding';
import './css/Map.css';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../component/MenuButton';

interface placeType {
  place_name: string,
  road_address_name: string,
  address_name: string,
  phone: string,
  place_url: string
}

interface ListItemProps {
  place: placeType & {
    placePosition: any,
    marker: any
  }
}

// head에 작성한 Kakao API 불러오기
const { kakao } = window as any;

const Map = (props: propsType) => {
  let markers: any[] = [];

  const navigate = useNavigate();
  
  // 추가: 검색 결과를 저장할 상태
  const [places, setPlaces] = useState<placeType[]>([]);

  const [searchResults, setSearchResults] = useState<Array<{placePosition: any, marker: any}>>([]);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); 
    const ps = new kakao.maps.services.Places();  
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    searchPlaces();

    function searchPlaces() {
      let keyword = props.searchKeyword;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        console.log("키워드를 입력해주세요!");
        return false;
      }

      ps.keywordSearch(keyword, placesSearchCB);
    }

    

    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === kakao.maps.services.Status.OK) {
        // 추가: 검색 결과를 places 상태에 저장
        setPlaces(data);

        displayPlaces(data);
        displayPagination(pagination);

      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    function displayPlaces(places: placeType[]) {
      const bounds = new kakao.maps.LatLngBounds();
    
      removeMarker();
    
      const results = places.map((place, i) => {
        let placePosition = new kakao.maps.LatLng(place.y, place.x),
            marker = addMarker(placePosition, i, undefined); 
    
        bounds.extend(placePosition);
    
        (function(marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            displayInfowindow(marker, title);
          });
    
          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });
        })(marker, place.place_name);
    
        return {...place, placePosition, marker};
      });
    
      setSearchResults(results);
    
      map.setBounds(bounds);
    }

    function addMarker(position: any, idx: number, title: undefined) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', 
          imageSize = new kakao.maps.Size(36, 37),  
          imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691),
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), 
            offset: new kakao.maps.Point(13, 37)
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
            position: position, 
            image: markerImage 
          });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    

    function displayPagination(pagination: { last: number; current: number; gotoPage: (arg0: number) => void }) {
      const paginationEl = document.getElementById('pagination') as HTMLElement;
      let fragment = document.createDocumentFragment();
      let i; 

      while (paginationEl.hasChildNodes()) {
        paginationEl.lastChild &&
          paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i=1; i<=pagination.last; i++) {
        const el = document.createElement('a') as HTMLAnchorElement;
        el.href = "#";
        el.innerHTML = i.toString();

        if (i===pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function(i) {
            return function() {
              pagination.gotoPage(i);
            }
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayInfowindow(marker: any, title: string) {
      const content = '<div style="padding:5px;z-index:1;" class="marker-title">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el: HTMLElement | null) {
      if (el) {
        while (el.hasChildNodes()) {
          el.lastChild && el.removeChild (el.lastChild);
        }
      }
    }
  }, [props.searchKeyword])

  const ListItem: React.FC<ListItemProps> = ({ place }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <React.Fragment>
              
          <li className='item' onClick={handleClick}>
          <div className="info">
            <h3 className="info-item place-name">{place.place_name}</h3><br/>
            {
              place.road_address_name 
                ? <>
                    <span className="info-item road-address-name">
                      {place.road_address_name}
                    </span>
                    <span className="info-item address-name">
                      {place.address_name}
                    </span>
                  </>
                : <span className="info-item address-name">
                    {place.address_name}
                  </span>
            }
            <span className="info-item tel">
              {place.phone}
            </span>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem><MenuButton redirectPath={`/calendar/planner/write?place=${place.place_name}`} text = {"계획표 작성"} /></MenuItem>
            <MenuItem><MenuButton redirectPath={`/check?place=${place.place_name}`} text = {"체크리스트 작성"}/></MenuItem>
            <MenuItem><MenuButton redirectPath={`/money/write?place=${place.place_name}`} text = {"예산관리 작성"}/></MenuItem>
            <MenuItem onClick={() => { window.location.href = place.place_url; handleClose(); }}>정보 보기</MenuItem>
          </Menu>
        </li>
       
      </React.Fragment>
    );
  }

  

  return (
    <div className="map-container">
      <div id="map" className="map"></div>
      <div id="search-result">
        <h3 className="result-text">
          <span className="result-keyword">
            { props.searchKeyword }
          </span>
          {"   "}검색 결과
        </h3>
        <div className="scroll-wrapper">
          <ul id="places-list">
          {searchResults.map((result, index) => (
            <ListItem key={index} place={result} />
          ))}
          </ul>
        </div>
        <div id="pagination"></div>
      </div>
    </div>
  )
}

export default Map;