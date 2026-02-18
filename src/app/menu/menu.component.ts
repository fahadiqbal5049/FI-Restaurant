import { Component, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../services/menu.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  selectedDietary: string[] = [];
  dietaryOptions = ['vegetarian', 'vegan', 'gluten-free'];
  loading: boolean = true;

  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.categories = this.menuService.getCategories();
  }

  loadMenu(): void {
    this.loading = true;
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        this.filteredItems = items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.filteredItems.filter(item => item.category === category);
  }
  
  toggleDietary(dietary: string): void {
    const index = this.selectedDietary.indexOf(dietary);
    if (index > -1) {
      this.selectedDietary.splice(index, 1);
    } else {
      this.selectedDietary.push(dietary);
    }
    this.applyFilters();
  }

  searchMenu(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.menuItems];

    // Category filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }

    // Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients?.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Dietary filter
    if (this.selectedDietary.length > 0) {
      filtered = filtered.filter(item =>
        this.selectedDietary.some(tag => item.dietaryTags?.includes(tag))
      );
    }

    this.filteredItems = filtered;
  }

  addToCart(item: MenuItem): void {
    this.cartService.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category
    });
    // Show feedback (you could add a toast notification here)
  }

  getSpicyLevelEmoji(level?: number): string {
    if (!level) return '';
    return '🌶'.repeat(level);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.debug('Image failed to load, replacing with placeholder. original src=', img.src);
    img.src = 'https://via.placeholder.com/400x250?text=No+Image';
  }
}

