import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FiltersService } from 'src/app/shared/filters.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  tableData: any;
  data: any;
  columns: any;
  rows: any;

  temp = [];

  @Input() val: any;
  @Input() selectedValue: any;

  containers = [];

  filters: any;

  filtersSelect: any;

  selectedFilter: any;

  filteredValue: any;
  filterGroupName: any;
  filterInput: any;

  value: any;
  filter: any;

  inputValue: any;

  public selectedColumn = 'groupName';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private dataStorageService: DataStorageService, private filtersService: FiltersService) {
  }

  ngOnInit() {

    this.columns = [
      { name: 'Date', slug: 'date' },
      { name: 'Group Name', slug: 'groupName' },
      { name: 'Disp. Position Error', slug: 'dispPositionError' },
      { name: 'Disp. Position', slug: 'dispPosition' },
      { name: 'PPM Position', slug: 'ppmPosition' },
      { name: 'Disp. Broadcasts', slug: 'dispBroadcasts' },
      { name: 'Disp. Mailing Error', slug: 'dispMailingError' },
      { name: 'PPM Mailing Error', slug: 'ppmMailingError' },
      { name: 'PPM', slug: 'ppm' },
      { name: 'PPM Corrected', slug: 'ppmCorrected' },
      { name: 'Bonus (€)', slug: 'bonus' }
    ];

    this.tableData = [];
    this.dataStorageService.dataChanged.subscribe(
      (response) => {
        this.data = response;
        let item = this.data;
        this.tableData = [];
        for (let i = 0; i < this.data.length; i++) {

          item = this.data[i];

          this.tableData.push({
            date: item.date,
            groupName: item.groupName,
            dispPositionError: item.dispPositionError,
            dispPosition: item.dispPosition,
            ppmPosition: item.ppmPosition,
            dispBroadcasts: item.dispBroadcasts,
            dispMailingError: item.dispMailingError,
            ppmMailingError: item.ppmMailingError,
            ppm: item.ppm,
            ppmCorrected: item.ppmCorrected,
            bonus: item.bonus
          });

          this.rows = [...this.tableData];

          this.temp = this.rows;
        }
      }
    );

    this.dataStorageService.getFilters()
      .subscribe(
        (filters) => {
          this.filters = Object.values(filters);
        }
      );
  }

  get selectedOption() {
    return this.selectedColumn;
  }

  set selectedOption(value) {
    this.selectedColumn = value;
  }

  addNew() {
    this.containers.push(this.containers.length);
  }

  deleteRow(i) {
    if (i !== -1) {
      this.containers.splice(i, 1);
    }
  }

  get selectedFilterOption() {
    return this.selectedFilter;
  }

  set selectedFilterOption(value) {
    this.selectedFilter = value;
  }

  onSelectUpdate(event) {
    const value = event.target.value;
    this.dataStorageService.getFilters()
      .subscribe(
        (filters) => {
          this.filters = Object.values(filters);
          this.filteredValue = this.filters.filter(
            (response) => {
              return value === response.filterName;
            }
          );
          this.selectedColumn = this.filteredValue[0].column;
          this.inputValue = this.filteredValue[0].filter;

          const valueField = this.filteredValue[0].filter;
          const valueSelected = this.filteredValue[0].column;

          const temp = this.temp.filter(function (d) {
            if (typeof (d[valueSelected]) === 'string') {
              return d[valueSelected].toLowerCase().indexOf(valueField) !== -1 || !valueField;
            } else {
              return d[valueSelected].toString().indexOf(valueField) !== -1 || !valueField;
            }
          });

          // update the rows
          this.rows = temp;
          // Whenever the filter changes, always go back to the first page
          this.table.offset = 0;
        }
      );
  }


  updateFilter(event) {
    this.val = event.target.value.toLowerCase();
    this.selectedValue = this.selectedOption.toString();

    this.filtersService.valueChanged.next(this.val);
    this.filtersService.columnChanged.next(this.selectedValue);

    const value = this.val;
    const valueSelected = this.selectedValue;

    // filter data
    const temp = this.temp.filter(function (d) {
      if (typeof (d[valueSelected]) === 'string') {
        return d[valueSelected].toLowerCase().indexOf(value) !== -1 || !value;
      } else {
        return d[valueSelected].toString().indexOf(value) !== -1 || !value;
      }
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  saveFilter() {
    this.selectedValue = this.selectedValue;
    this.value = this.val;
    this.filter = {
      filterName: 'filter' + Math.floor(Math.random() * Math.floor(100000000)),
      column: this.selectedValue,
      filter: this.value
    };
    // console.log(this.filter);
    if (this.selectedValue || this.value) {
      this.filtersService.addFilters(this.filter);
      this.dataStorageService.postData()
        .subscribe(
          (response: Response) => {
            // console.log(response);
          }
        );
    }
  }
}
