import React, { Dispatch } from 'react';
import { FlyToInterpolator, Marker } from 'react-map-gl';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import useSupercluster from 'use-supercluster';

const MarkerMain = styled.div`
  border: 1px solid ${props => props.color};
  background-color: ${props => props.color};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  cursor: pointer;
`

const ClusterMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: black;
  font-size: 12px;
  color: white;
  border-radius: 50%;
  cursor: pointer;
`

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

interface Props {
  points: AlumniType[],
  viewport: any,
  setViewport: Dispatch<any>,
  mapRef: any,
  setPopup: Dispatch<any>
}

const Markers: React.FC<Props> = ({ points, viewport, setViewport, mapRef, setPopup}) => {

  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: {radius: 50, maxZoom: 15 }
  });

  return (
    <>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {cluster: isCluster, point_count: pointCount} = cluster.properties;
        if (isCluster) {
            return (
              <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                <ClusterMain style={{
                  width: `${25 + (pointCount / points.length) * 50}px`,
                  height: `${25 + (pointCount / points.length) * 50}px`
                }}
                             onClick={() => {
                               const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                               setViewport({
                                 ...viewport,
                                 latitude,
                                 longitude,
                                 zoom: expansionZoom,
                                 transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
                                 transitionDuration: "auto"
                               })
                             }}
                >{pointCount}</ClusterMain>
              </Marker>
            )
        } else {
           return (
               <Marker key={uuidv4()} latitude={latitude} longitude={longitude} onClick={() => {setPopup(cluster)}}
               >
                <MarkerMain color={cluster.properties.color}/>
               </Marker>
        )
        }
      })}
    </>
  )
}

export default Markers