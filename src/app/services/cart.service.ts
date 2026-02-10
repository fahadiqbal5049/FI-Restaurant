import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  specialInstructions?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id && i.specialInstructions === item.specialInstructions);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    this.updateCart();
  }

  removeFromCart(itemId: number, specialInstructions?: string): void {
    this.cartItems = this.cartItems.filter(
      item => !(item.id === itemId && item.specialInstructions === specialInstructions)
    );
    this.updateCart();
  }

  updateQuantity(itemId: number, quantity: number, specialInstructions?: string): void {
    const item = this.cartItems.find(
      i => i.id === itemId && i.specialInstructions === specialInstructions
    );
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId, specialInstructions);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCart();
    }
  }
}

