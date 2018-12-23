export class Filter {
  public filterName: string;
  public column: string;
  public filter: string;

  constructor(filterName: string, column: string, filter: string) {
    this.filterName = filterName;
    this.column = column;
    this.filter = filter;
  }
}
