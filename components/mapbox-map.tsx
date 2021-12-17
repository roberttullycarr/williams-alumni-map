import * as React from "react";
import ReactMapGL from 'react-map-gl';
import { useRef, useState } from 'react';
import PopUp from './popup';
import Markers from './Markers';

interface Properties {
  color: string,
  name: string,
  class: string,
  employer: string,
  type: string,
  title: string,
}

interface Geometry {
  coordinates: string[],
  type: string,
}

type AlumniType = {
  properties: Properties,
  geometry: Geometry,
}

interface FilterOptions {
  years: number[],
  types: string[]
}


interface Props {
  alumniData: AlumniType[],
  filterOptions: FilterOptions,
}

const accessToken = process.env.MAPBOX_TOKEN;


const MapboxMap: React.FC<Props> = ({ alumniData, filterOptions }) => {
  const mapRef: any = useRef();
  const [popup, setPopup] = useState<any>(null);

  const points = alumniData.filter(x => !filterOptions.years.includes(parseFloat(x.properties.class)) && !filterOptions.types.includes(x.properties.type));

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