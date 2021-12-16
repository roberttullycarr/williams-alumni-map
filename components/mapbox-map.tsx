import * as React from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRef } from 'react';

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

const MarkerMain = styled.div`
  border: 1px solid ${props => props.color};
  background-color: ${props => props.color};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  cursor: pointer;
`

const MapboxMap: React.FC<Props> = ({ alumniData, filterOptions }) => {
  const mapRef = useRef();

  // const coordinates = alumniData.map(point => {
  //   if (point.geometry.coordinates[1] !== undefined) {
  //     return {latitude: parseFloat(point.geometry.coordinates[1]), longitude: parseFloat(point.geometry.coordinates[0])}
  //   }
  // });
  //
  // // @ts-ignore
  // const center: any = getCenter(coordinates);

  const [viewport, setViewport] = React.useState<object>({
    latitude: 20.775608026033595,
    longitude: 13.326139455488722,
    zoom: 1.4139073733575152
  });

  //
  return (
    <ReactMapGL
      {...viewport}
      width='100vw'
      height="100%"
      onViewportChange={(viewport: React.SetStateAction<object>) => setViewport(viewport)}
      mapboxApiAccessToken={accessToken}
    >
      {alumniData.map(point => {
        if (!filterOptions.years.includes(parseInt(point.properties.class)) && !filterOptions.types.includes(point.properties.type) && point.properties.class !== '' ) {
           return (
            <Marker key={uuidv4()} latitude={parseFloat(point.geometry.coordinates[1])} longitude={parseFloat(point.geometry.coordinates[0])}>
              <MarkerMain color={point.properties.color}/>
            </Marker>
        )
        }
      })}
    </ReactMapGL>
  );
}

export default MapboxMap