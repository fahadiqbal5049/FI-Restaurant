import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, MenuItem } from '../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredItems: MenuItem[] = [];
  
  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedItems();
  }

  loadFeaturedItems(): void {
    this.menuService.getMenuItems().subscribe(items => {
      this.featuredItems = items.filter(item => 
        item.chefRecommendation || item.popular
      ).slice(0, 4);
    });
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }

  navigateToReservations(): void {
    this.router.navigate(['/reservations']);
  }
}

