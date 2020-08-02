export interface State{
    stateCd: string;
    stateName: string;
}


export interface Country{
    countryCd: string;
    countryName: string;
    phoneCode: string;
}

export interface StaticData{
    states: State[];
    countries: Country[];
}
