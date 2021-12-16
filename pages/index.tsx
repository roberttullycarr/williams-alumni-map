import type { NextPage } from 'next'
import { getAlumniData } from "./api/api";
import MapboxMap from '../components/mapbox-map';
import styled from "styled-components";
import Filter from '../components/filter';
import Head from 'next/head';
import { useState } from 'react';
import genYears from '../data/years';
import uniqueCategories from '../data/categories';


interface Props {
  alumni: [];
}

interface Years {
  years: () => void,
}

const Title = styled.h1`
  color: red;
`;


const Home: NextPage<Props> = ({alumni}) => {
  const years: number[] = genYears(1974);
  const types: string[] = uniqueCategories(alumni);
  const [filterOptions, setFilterOptions] = useState<any>({years: [], types: []});

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/gpn3nrd.css" />
        <title>Alumni Map</title>
      </Head>
      <MapboxMap alumniData={alumni} filterOptions={filterOptions}/>
      <Filter years={years} filterOptions={filterOptions}
                        setFilterOptions={setFilterOptions}
                            types={types}/>
    </>
  )
}

export default Home

export async function getServerSideProps() {
  const alumni = await getAlumniData();

  return {
    props: {
      alumni,
    },
  };
}