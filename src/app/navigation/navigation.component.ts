import { Component, OnInit, Input } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  activeTabs = [];
  data: any;
  isClosed = false;
  @Input() menuClosed = false;
  current = 0;
  @Input() tabChange: any;
  selected = new FormControl(0);

  isActive = false;

  activeTabAmount = 0;

  tmp: any;

  constructor(private dataStorageService: DataStorageService) { }


  ngOnInit() {
    this.dataStorageService.dataArray = [];

    this.dataStorageService.getData()
      .subscribe(
        (response) => {
          this.data = response;

          this.dataStorageService.dataChanged.next(this.data[0].categories[0]['data']);
          this.openTab(
            0,
            0,
            this.data[0].categories[0].name,
            this.data[0].categories[0].id
          );
        }
      );


    this.dataStorageService.tabDeleted.subscribe(
      (response: number) => {

        this.tmp = this.activeTabs.filter(
          (result) => {
            return result;
          }
        );

        if (this.tmp.length > 1) {
          this.tmp.splice(response, 1);

          let _i: any;
          let _j: any;

          _i = this.tmp[0]._i;
          _j = this.tmp[0]._j;


          this.activeTabs = this.tmp;

          this.dataStorageService.tabChanged.next(this.activeTabs);
          this.dataStorageService.dataChanged.next(this.data[_i].categories[_j]['data']);
          console.log(this.activeTabs);
        }

      }
    );
  }

  collapseNested(i: number) {
    if (this.data[i]) {
      this.data[i]['slug'] = !this.data[i]['slug'];
    }
  }

  openTab(i, j, name, id) {

    let x = 0;
    for (let k = 0; k < this.activeTabs.length; k++) {
      if (this.activeTabs[k] === undefined) {
        continue;
      }
      if (this.activeTabs[k]._id === id) {
        x++;
      }
    }

    if (x !== 0) {
      return;
    }


    this.activeTabAmount++;
    this.activeTabs[id] = { _id: id, _name: name, _i: i, _j: j };

    this.activeTabs = this.activeTabs.filter(
      (filter) => {
        return filter;
      }
    );

    this.dataStorageService.dataChanged.next(this.data[i].categories[j]['data']);
    this.dataStorageService.tabChanged.next(this.activeTabs);
  }

}
