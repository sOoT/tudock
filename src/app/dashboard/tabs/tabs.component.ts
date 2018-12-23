import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { FiltersService } from 'src/app/shared/filters.service';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  data: any;
  categories: any;
  subCategories: any;
  subCategoryArray = [];
  tabs: any;
  result: any;

  activeTabs: any;
  rawActiveTabs: any;

  activeTab: any;



  selectedValue: any;


  @ViewChild(NavigationComponent) navigationComponent: NavigationComponent;
  @ViewChild(TabComponent) tabComponent: TabComponent;

  constructor(private dataStorageService: DataStorageService, private filtersService: FiltersService) { }

  ngOnInit() {


    this.dataStorageService.tabChanged.subscribe(
      (response) => {
        this.rawActiveTabs = response;
        this.activeTabs = this.rawActiveTabs.filter(
          (el) => {
            this.activeTab = el._id;
            return el != null;
          }
        );
      }
    );
  }


  showTab(id) {
    // this.subCategoryArray = [];
    this.activeTab = id;
    this.dataStorageService.getData()
      .subscribe(
        (response) => {
          this.data = response;
          this.subCategories = this.data.map(
            (categories) => {
              this.categories = categories.categories;
              return this.categories.filter(
                (filteredResults) => {
                  return filteredResults.id === id;
                }
              );
            }
          );

          this.result = this.subCategories.filter(
            (filter) => {
              return filter.length !== 0;
            }
          );

          this.dataStorageService.dataChanged.next(this.result[0][0]['data']);
        }
      );
  }

  removeTab(i: number) {
    this.dataStorageService.tabDeleted.next(i);
  }
}
