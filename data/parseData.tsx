const floatChange = (floatArr: any[]) => {
    const final = [];
    for (let i = 0; i < floatArr.length; i++) {
        let randomNumber: any = Math.floor(Math.random() * 5000) + 1;
        randomNumber.toString();
        const partFloat = parseFloat(floatArr[i]).toFixed(7).toString().slice(0, -4);
        final.push(parseFloat(partFloat.concat(randomNumber)));
    }
    return final;
}


const parseData = (data: any) => {
  return data.map((alum: any) => ({
      type: alum.type,
      properties: alum.properties,
      geometry: {
        type: alum.geometry.type,
        coordinates: floatChange([alum.geometry.coordinates[0], alum.geometry.coordinates[1]]),
      }
    }));
  };

export default parseData;