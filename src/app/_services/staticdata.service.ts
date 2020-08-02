import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticData, State, Country } from '../_models/static';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticdataService {

  staticData: StaticData;
  states: State[] = [];
  country: Country[] = [];
  constructor(private http: HttpClient) { }

  getStaticData(){
    return this.http.get<StaticData>(`${environment.apiUrl}/resourses/staticdata`);
  }

  getStates(){
    return this.http.get<State>(`${environment.apiUrl}/resourses/states`);
  }

  getCountries(){
    return this.http.get<Country>(`${environment.apiUrl}/resourses/countries`);
  }
}
