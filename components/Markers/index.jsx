import React from 'react';
import { Marker } from 'react-map-gl';
import { v4 as uuidv4 } from 'uuid';
import useSupercluster from 'use-supercluster';
import { ClusterMain, MarkerMain } from './styled';

// renders clusters and individual map points, depending on zoom level
const Markers = ({ points, viewport, flyToPoint, mapRef, setPopup}) => {
  // becomes basis for deciding between rendering a cluster or a marker
  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  // takes an array of data, and converts them to "clusters", which then have the ability to become "super clusters". sets
  // sensitivity of border between cluster and marker.  zoom is the max zoom level at which a cluster will break apart.
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: {radius: 50, maxZoom: 12 }
  });

  return (
    <>
      {clusters.map(cluster => {
        // extracting data for better semantic use
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {cluster: isCluster, point_count: pointCount} = cluster.properties;
        // renders cluster if data meets the requirements
        if (isCluster) {
            return (
              <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
                <ClusterMain style={{
                  width: `${25 + (pointCount / points.length) * 50}px`,
                  height: `${25 + (pointCount / points.length) * 50}px`
                }}
                             onClick={() => {
                               const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                               flyToPoint(longitude, latitude, expansionZoom)
                             }}
                >{pointCount}</ClusterMain>
              </Marker>
            )
        } else {
           // if zoomed in enough, a marker will be rendered instead of cluster
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

export default Markers;