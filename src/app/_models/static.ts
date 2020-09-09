export interface State{
    stateCd: string;
    stateName: string;
}


export interface Country{
    countryCd: string;
    countryName: string;
    phoneCode: string;
}

export interface Subject{
  subjectId: number;
  name: string;
  level: string;
}

export interface Medium{
  mediumId: number;
  mediumName: string;
}

export interface Group{
  groupId: 1;
  groupName: string;
}



export interface StaticData{
    states: State[];
    countries: Country[];
    subjects: Subject[];
    mediums: Medium[];
    groups: Group[];
}
