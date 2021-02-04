import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems : MenuItem[] = [
    new MenuItem("User", "/user-list", "User List"),
    new MenuItem("Vendor","/vendor-list","Vendor List"),
    new MenuItem("Product","/product-list","Product List"),
    new MenuItem("Request","/request-list","Request List"),
    new MenuItem("Review", "/request-review/", "Review List"),
    new MenuItem("Login","/user-login","User Login")
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
