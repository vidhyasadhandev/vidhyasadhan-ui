import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitenav',
  templateUrl: './sitenav.component.html',
  styleUrls: ['./sitenav.component.css']
})
export class SitenavComponent implements OnInit {

  public isCollapsed = true;
  isSelected = true;

  menunav = [
    {id: 0, name: 'Home', isActive: true, path: '/home'},
    {id: 1, name: 'About Us', isActive: false, path: '/home/about'},
    {id: 2, name: 'Features', isActive: false, path: '/home/features'},
    {id: 3, name: 'Pricing', isActive: false, path: '/home/pricing'},
    {id: 4, name: 'Contact Us', isActive: false, path: '/home/contact'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clickedItem(item){
    this.menunav.forEach(x => x.isActive = false);
    item.isActive =  true;
  }

}
