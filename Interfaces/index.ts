export interface Properties {
  color: string,
  name: string,
  class: string,
  employer: string,
  type: string,
  title: string,
}

export interface Geometry {
  coordinates: string[],
  type: string,
}

export type AlumniType = {
  properties: Properties,
  geometry: Geometry,
}

export interface ICategories {
  name: string; 
  color: string;
}

export interface FilterOptions {
  years: number[];
  categories: string[];
}

