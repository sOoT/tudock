import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tudock-test';

  menuClosed = false;

  ngOnInit() {

    // Foundation init
    setTimeout(() => {
      $(document).foundation();
    }, 2600);

  }
}