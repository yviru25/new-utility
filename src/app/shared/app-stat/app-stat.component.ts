import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './app-stat.component.html',
  styleUrls: ['./app-stat.component.scss']
})
export class AppStatComponent implements OnInit {

    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;

    constructor() { }

    ngOnInit() {
    }

}
