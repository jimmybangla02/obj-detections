import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  nav = [
    {name: 'Image Detection', path: '/image-detection'},
    {name: 'Video Detection', path: '/video-detection'}
  ];

  currentRouter: string;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((selectedPage: any) => {
      if (selectedPage && selectedPage.url) {
        this.currentRouter = selectedPage.url;
      }
    });
  }

}
