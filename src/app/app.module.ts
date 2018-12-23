import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataStorageService } from './shared/data-storage.service';
import { GroupByPipe } from './shared/group-by.pipe';
import { TabsComponent } from './dashboard/tabs/tabs.component';
import { TabComponent } from './dashboard/tabs/tab/tab.component';
import { FormsModule } from '@angular/forms';
import { FiltersService } from './shared/filters.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GroupByPipe,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers: [
    DataStorageService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
