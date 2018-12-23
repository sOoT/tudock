import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { FiltersService } from './filters.service';

@Injectable()
export class DataStorageService {

  dataChanged = new Subject();

  tabChanged = new Subject();
  tabDeleted = new Subject();
  tabActivated = new Subject();

  dataArray: any;

  constructor(private http: HttpClient, private filtersService: FiltersService) { }

  getData() {
    return this.http
      .get('https://tudock-41188.firebaseio.com/dataSource.json')
      .map(
        (data) => {
          return data;
        });
  }

  postData() {
    return this.http.post('https://tudock-41188.firebaseio.com/filterSource.json', this.filtersService.getFilters());
  }

  // deleteData(index: number) {
  //   return this.http.delete('https://tudock-41188.firebaseio.com/filterSource.json', this.filtersService.deleteFilter(index));
  // }

  getFilters() {
    return this.http
    .get('https://tudock-41188.firebaseio.com/filterSource.json')
    .map(
      (data) => {
        return data;
      }
    );
  }

}
