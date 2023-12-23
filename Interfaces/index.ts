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

export interface ITypes {
  category: string; 
  color: string;
}

export interface FilterOptions {
  years: number[];
  types: string[];
}

