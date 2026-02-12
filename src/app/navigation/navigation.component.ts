import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  cartItemCount = 0;
  isMenuOpen = false;
  isLoggedIn = false;
  userName: string | null = null;

  constructor(
    public router: Router,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });

    this.updateAuthState();
    // Optionally listen for storage events to react to login/logout in another tab
    window.addEventListener('storage', () => this.updateAuthState());
  }

  updateAuthState(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    const user = this.auth.getCurrentUser();
    this.userName = user ? user.name : null;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  logout(): void {
    this.auth.logout();
    this.updateAuthState();
    this.router.navigate(['/']);
  }
}

