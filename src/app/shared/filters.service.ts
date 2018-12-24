import { Injectable } from '@angular/core';
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

}
