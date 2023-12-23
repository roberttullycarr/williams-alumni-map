import Head from 'next/head'
import { getAlumniData } from '../utils/api'
import Home from './home';
import parseData from '../data/parseData';
import { uniqueCategories } from '../data/categories';
 
export default async function Page() {
  const alumniData = await getAlumniData();
  const parsedAlumniData = parseData(alumniData);
  const categories = uniqueCategories(parsedAlumniData)
  return (
    <>
      <Home startData={parsedAlumniData} categories={categories}/>
    </>
  )
}