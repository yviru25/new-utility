import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridTile } from './../../shared/shared-model/grid-model-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})
export class DashboardComponent implements OnInit {

  gridTileList = [
    {moduleId: 1, moduleTitle: 'Annual Information Statement', cols: 1, rows: 2, icon: 'assets/images/lock.png'},
    {moduleId: 2, moduleTitle: 'e-Campaign', cols: 1, rows: 2, icon: 'assets/images/emailer.png'},
    {moduleId: 3, moduleTitle: 'e-Proceeding', cols: 1, rows: 2, icon: 'assets/images/e-verifaction.png'}
  ];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  ecompaignModule() {
     this.route.navigate(['dashboard/ecompaign']);
  }

  importJsonFile(moduleCode) {
    this.route.navigate(['dashboard/fileimport']);
  }

}
