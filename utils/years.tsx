const genYears = (min: number) => {
  const max = new Date().getFullYear();
  let years = []

  for (let i = min; i <= max; i++) {
    years.push(i);
  }
  return years;
}

export default genYears
