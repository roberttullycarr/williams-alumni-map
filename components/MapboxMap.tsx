import React, { useCallback } from "react";
import { Map, NavigationControl } from 'react-map-gl';
import { useRef, useState } from 'react';
import { AlumniType, FilterOptions } from '../Interfaces';
import PopUp from "./popup";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";


interface Props {
  alumniData: AlumniType[],
  filterOptions: FilterOptions,
}

// references the mapbox token stored in the next.config.js file. used to render mapbox map
const accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

// renders mapbox map
const MapboxMap: React.FC<Props> = ({ alumniData, filterOptions }) => {
  const [loadMarkers, setLoadMarkers] = useState(false);
  // mapRef gives access to the current bounds on map. becomes the basis for deciding between a cluster and a marker.
  const mapRef: any = useRef(); 
  // stores data of the alumni the user clicked on, so it can be displayed in the popup.
  const [popup, setPopup] = useState<AlumniType | null>(null);

  // takes the raw data and filters it based on the filter options selected by user.
  const points = alumniData.filter(x => filterOptions.years.includes(parseFloat(x.properties.class)) && filterOptions.categories.includes(x.properties.type));

  // an state hook that sets the initial lat, log and zoom settings for mapbox map, and then takes changes when user or program zooms in or out
  const [viewState, setViewState] = React.useState<object> ({
    latitude: 20.775608026033595,
    longitude: 13.326139455488722,
    zoom: 1.4139073733575152
  });

  const flyToPoint = useCallback((longitude: any, latitude: any, zoom: any) => {
    mapRef.current?.flyTo({center: [longitude, latitude], zoom: zoom, duration: 1000});
  }, []);


  return (
    <Map
      {...viewState}
      style={{width: '100vw', height: "100vh", position: "relative"}}
      mapStyle="mapbox://styles/robertcarr/cksq82xv811w818pmvv79xvgd"
      onLoad={() => setLoadMarkers(true)}
      onMove={(evt: any) => {
        setViewState(evt.viewState)
      }}
      mapboxAccessToken={accessToken}
      ref={mapRef}
    >
      <NavigationControl style={{
        right: "0 !important",
        margin: "1.5rem 1.5rem"}}
      />
      { loadMarkers && 
        <Markers 
          points={points}   
          viewport={viewState}
          flyToPoint={flyToPoint}
          mapRef={mapRef} 
          setPopup={setPopup}
        />
      }
      {popup && <PopUp popup={popup} setPopup={setPopup} />}
    </Map>
  );
}

export default MapboxMap