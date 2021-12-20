import type { NextPage } from 'next'
import { getAlumniData } from "./api/api";
import MapboxMap from '../components/mapbox-map';
import Filter from '../components/filter';
import Head from 'next/head';
import { useState } from 'react';
import genYears from '../data/years';
import uniqueCategories from '../data/categories';
import parseData from '../data/parseData';

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
  alumniData: AlumniType[];
}


// main page component of project. data comes from './api/api.js'
const Home: NextPage<Props> = ({alumniData}) => {
  // generates list of years between 1974 and current year, for use when creating filter checkboxes, as well as for filtering years.
  const years: number[] = genYears(1974);
  // reduces categories listed in data to only unique ones.  this can be taken out when we have a set number of categories
  const types: string[] = uniqueCategories(alumniData);
  // lists the years and industries that will be filtered from the map display.   passed down to both the filter and mapbox-map components
  const [filterOptions, setFilterOptions] = useState<any>({years: [], types: []});


  // head component in return adds our font to the next.js index.html head
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/gpn3nrd.css" />
        <title>Alumni Map</title>
      </Head>
      <MapboxMap alumniData={alumniData} filterOptions={filterOptions}/>
      <Filter years={years} filterOptions={filterOptions}
                        setFilterOptions={setFilterOptions}
                            types={types}/>
    </>
  )
}

export default Home

export async function getServerSideProps() {
  const alumni = await getAlumniData();
  const alumniData = parseData(alumni);

  return {
    props: {
      alumniData,
    },
  };
}