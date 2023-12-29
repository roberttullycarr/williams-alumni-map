import { getAlumniData } from '../utils/api'
import Home from './home';
import parseData from '../utils/parseData';
import { uniqueCategories } from '../utils/categories';
 
export default async function Page() {
  const alumniData = await getAlumniData();
  const parsedAlumniData = parseData(alumniData);
  const categories: any = uniqueCategories(parsedAlumniData);

  if (categories && parsedAlumniData){
    return <Home startData={parsedAlumniData} categories={categories}/>
  }
}