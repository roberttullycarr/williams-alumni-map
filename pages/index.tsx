import type { NextPage } from 'next'
import { getAlumniData } from "./api/api";
import MapboxMap from '../components/mapbox-map';
import styled from "styled-components";


interface Props {
  alumni: [];
}

const Title = styled.h1`
  color: red;
`;

const Home: NextPage<Props> = ({alumni}) => {

  return (
      <MapboxMap alumniData={alumni} />
  );
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