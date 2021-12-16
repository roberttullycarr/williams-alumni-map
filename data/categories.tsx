
const uniqueCategories = (data: any) => {
  let categories: any[] = [];
  for (let i = 0; i <= data.length; i++) {
    let cat: any = data[i]?.properties.type;
    if (!categories.includes(cat) && cat !== "" && cat !== undefined) {
      categories.push(cat)
    }
  }
  return categories.sort();
}

export default uniqueCategories