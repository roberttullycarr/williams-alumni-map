'use client'
import MapboxMap from '../components/MapboxMap';
import Filter from '../components/filter';
import { useState } from 'react';
import genYears from '../data/years';
import { AlumniType, FilterOptions } from '../Interfaces';
import { Global, css } from '@emotion/react';

interface Props {
  startData: AlumniType[];
  categories: string[];
}

const globalStyles = css`
    * {
    box-sizing: border-box;
    font-family: trade-gothic-next, sans-serif;
    font-weight: 400;
    font-style: normal;
    padding: 0;
    margin: 0;
  }
  
  .navigation-control {
    right: 0 !important;
    margin: 1.5rem 1.5rem;
}
  
  .mapboxgl-popup-content {
      border: 1px solid black;
      padding: 0;
      border-radius: 0 !important;
    }
    
    
  .mapboxgl-popup-close-button {
      margin-right: 8px;
      font-size: 20px;
        :hover {
        background: white !important;
      }
    }
  
  .m
  
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  
  #__next {
    height: 100vh;
  }
`


// main page component of project. data comes from './api/api.js'
const Home = ({ startData, categories }: Props) => {
  // // generates list of years between 1974 and current year, for use when creating filter checkboxes, as well as for filtering years.
  const years: number[] = genYears(1974);
  // // lists the years and industries that will be filtered from the map display.   passed down to both the filter and mapbox-map components
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({years: years, types: categories});

  return (
    <>
      <Global styles={globalStyles} />
      <MapboxMap alumniData={startData} filterOptions={filterOptions}/>
      <Filter 
        years={years} 
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        types={categories}/>
    </>
  )
}

export default Home;