import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface Location {
  latitude: number;
  longitude: number;
}

const MapPage = () => {
  const [location, setLocation] = useState<Location | null>(null); // 현재 위치를 저장할 상태

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  }, []);

  const successHandler = (response: GeolocationPosition) => {
    console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error: GeolocationPositionError) => {
    console.log(error);
  };

	return (
		<>
			{location && (
				<Map 
                  center={{ lat: location.latitude, lng: location.longitude }} 
                  style={{ display:"flex", marginLeft:"30px", marginTop:"30px", width: '800px', height: '600px' }} 
                  level={3}
                >
					<MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
				</Map>
			)}
		</>
	);
};
export default MapPage;