import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tutorfilter'
})
export class TutorfilterPipe implements PipeTransform {

  transform(value, keys: string, arg1: any) {
    console.log(arg1);
    let filterValue = (value || []);
    console.log(filterValue);
    if (arg1[0]){
      filterValue = (filterValue).filter(item => keys.split(',').some(key => item.hasOwnProperty(key)
                                                             && new RegExp(arg1[0], 'gi').test(item[key])));
    }
    if (arg1[1]){
      filterValue = (filterValue).filter(item => keys.split(',').some(key => item.hasOwnProperty(key)
      && new RegExp(arg1[1], 'gi').test(item[key])));
    }
    if (arg1[2]){
      filterValue = (filterValue).filter(item => keys.split(',').some(key => item.hasOwnProperty(key)
      && new RegExp(arg1[2], 'gi').test(item[key])));
    }
    return filterValue;
  }

}
