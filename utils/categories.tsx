
// export const uniqueCategories = (data: any) => {
//   let categories: any[] = [];
//   for (let i = 0; i <= data.length; i++) {
//     let cat: any = data[i]?.properties.type;
//     if (!categories.includes(cat) && cat !== "" && cat !== undefined) {
//       categories.push(cat)
//     }
//   }
//   return categories.sort();
// }

const uniqueArray = (objects:any, uniqueBy: any, keepFirst = true) => {
  return Array.from(
      objects.reduce((map:any, e: any) => {
          let key = uniqueBy.map((key:any) => [e[key], typeof e[key]]).flat().join('-')
          if (keepFirst && map.has(key)) return map
          return map.set(key, e)
      }, new Map()).values()
  )
}

export const uniqueCategories = (data: any) => {
  const allCategories = data.map((item: any) => {
    return {
      name: item.properties.type,
      color: item.properties.color
    }
  }).filter((x:any) => x.color !== "" || x.name !== "");

  const uniqueCategories = uniqueArray(allCategories, ["name", 'color'])
  return uniqueCategories
}


