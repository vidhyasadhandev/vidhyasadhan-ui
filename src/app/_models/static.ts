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
  groupId: number;
  groupName: string;
}

export interface Board{
  boardId: number;
  boardName: string;
}



export interface StaticData{
    states: State[];
    countries: Country[];
    subjects: Subject[];
    mediums: Medium[];
    groups: Group[];
    boards: Board[];
}


export interface Statistics{
  events: EventCounts;
  tutors: Totals;
  materials: Totals;
  progress: Totals;
  earnings: Totals;
  profiles: Totals;
}

export interface Totals{
  total: number;
}

export interface EventCounts extends Totals{
  demos: number;
  classes: number;
}
