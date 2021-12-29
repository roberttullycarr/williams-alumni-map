import * as React from "react";
import ReactMapGL from 'react-map-gl';
import { useRef, useState } from 'react';
import PopUp from './popup';
import Markers from './Markers';
import { AlumniType, FilterOptions } from '../Interfaces';
import 'mapbox-gl/dist/mapbox-gl.css';


interface Props {
  alumniData: AlumniType[],
  filterOptions: FilterOptions,
}

// references the mapbox token stored in the next.config.js file. used to render mapbox map
const accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

// renders mapbox map
const MapboxMap: React.FC<Props> = ({ alumniData, filterOptions }) => {
  // mapRef gives access to the current bounds on map. becomes the basis for deciding between a cluster and a marker.
  const mapRef: any = useRef();

  // stores data of the alumni the user clicked on, so it can be displayed in the popup.
  const [popup, setPopup] = useState<any>(null);

  // takes the raw data and filters it based on the filter options selected by user.
  const points = alumniData.filter(x => filterOptions.years.includes(parseFloat(x.properties.class)) && filterOptions.types.includes(x.properties.type));

  // an state hook that sets the initial lat, log and zoom settings for mapbox map, and then takes changes when user or program zooms in or out
  const [viewport, setViewport] = React.useState<object> ({
    latitude: 20.775608026033595,
    longitude: 13.326139455488722,
    zoom: 1.4139073733575152
  });

  return (
    <ReactMapGL
      {...viewport}
      width='100vw'
      height="100%"
      onViewportChange={(viewport: React.SetStateAction<object>) => setViewport(viewport)}
      mapboxApiAccessToken={accessToken}
      ref={mapRef}
    >
      <Markers points={points} viewport={viewport} setViewport={setViewport} mapRef={mapRef} setPopup={setPopup}/>
      {popup && <PopUp popup={popup} setPopup={setPopup} />}
    </ReactMapGL>
  );
}

export default MapboxMap