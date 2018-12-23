import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from './data-storage.service';
import { Filter } from './filter.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FiltersService {

  valueChanged = new Subject();
  columnChanged = new Subject();
  filterChanged = new Subject<Filter[]>();

  private filters: Filter[] = [];

  constructor() { }

  addFilters(filter: Filter[]) {
    this.filters = filter;
    this.filterChanged.next(this.filters);
  }

  getFilters() {
    return this.filters;
  }

  deleteFilter(index: number) {
    this.filters.splice(index, 1);
    this.filterChanged.next(this.filters.slice());
    console.log(this.filters);
  }


}
