import * as React from "react";
import ReactMapGL, { Marker, Popup, Layer } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import SVGMarker from '../assets/maps-black.svg';
import styled from 'styled-components';
// import the mapbox-gl styles so that the map is displayed correctly

type AlumniType = {
  color: string,
  name: string,
  class: string,
  employer: string,
  type: string,
  title: string,
  lat: number,
  long: number
}

interface Props {
  alumniData: AlumniType[],
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

const MapboxMap: React.FC<Props> = ({ alumniData }) => {
  const data = [[-97.3689599, 32.7477161]];

  const coordinates = alumniData.map(point => {
    if (point.lat !== undefined) {
      return {latitude: point.lat, longitude: point.long}
    }
  });

  const center = getCenter(coordinates);

  const [viewport, setViewport] = React.useState<object>({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 3.35
  });
  return (
    <ReactMapGL
      {...viewport}
      width='100vw'
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken={accessToken}
    >
      {alumniData.map(point => {
        return (
            <Marker latitude={parseFloat(point.lat)} longitude={parseFloat(point.long)}>
              <MarkerMain color={point.color}/>
            </Marker>
        )
      })}
    </ReactMapGL>
  );
}

export default MapboxMap