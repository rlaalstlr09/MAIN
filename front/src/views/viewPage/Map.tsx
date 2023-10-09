// MapPage.tsx
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk'; // 알맞은 경로

interface Location {
  latitude: number;
  longitude: number;
}

interface SearchResult {
  place_name: string;
  address_name: string;
  y: string; // 위도
  x: string; // 경도
}

const MapPage = () => {
  
  const [location, setLocation] = useState<Location | null>(null);

  const successHandler = (response: GeolocationPosition) => {
    console.log(response);
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };
  
  const errorHandler = (error: GeolocationPositionError) => {
    console.log(error);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler,errorHandler);
  }, []);

    const [searchResults,setSearchResults] = useState<SearchResult[]>([]);
   
    const searchPlace=(keyword:string)=>{
       if(window?.kakao?.maps?.services){
          new window.kakao.maps.services.Places().keywordSearch(keyword,(result,status)=>{
             if(status===window.kakao.maps.services.Status.OK){
                setSearchResults(result.map((item:any)=>({
                   place_name:item.place_name,
                   address_name:item.address_name,
                   y:item.y,
                   x:item.x
                })));
             }
          });
       }
    };

	return (
       <>
        <input type="text" placeholder="장소 검색" onKeyPress={(e)=>{
          if(e.key === "Enter"){
            searchPlace((e.target as HTMLInputElement).value); 
          }
        }}/>
        
        {location && (
          <Map 
            center={{ lat: location.latitude , lng : location.longitude}} 
            style={{ display:"flex", marginLeft:"30px", marginTop:"30px", width: '800px', height: '600px' }} 
            level={3}
          >
             <MapMarker position={{ lat : location.latitude , lng : location.longitude}} />
             
             {searchResults.map((result,index)=>(
                <MapMarker key={index} position={{ lat : parseFloat(result.y), lng : parseFloat(result.x)}} />
             ))}
            
           </Map>
        )}

        {/* 검색결과 리스트 */}
         <ul>
           {searchResults.map((result,index)=>(
              <li key={index}>
                 장소명:{result.place_name}, 주소:{result.address_name}
              </li>
           ))}
         </ul>
      </>
    );
};
export default MapPage;
