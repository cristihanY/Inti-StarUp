import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  images: string[] = [
    'assets/images/baner-7.png',
    'assets/images/baner-6.jpg',
    'assets/images/baner-7.png',
  ];

  constructor() { }

  ngOnInit() {
  }

}
