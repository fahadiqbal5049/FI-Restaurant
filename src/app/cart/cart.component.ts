import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  checkoutForm!: FormGroup;
  orderType: 'pickup' | 'delivery' = 'pickup';
  showCheckout: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.getCartTotal();
    });

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      deliveryTime: [''],
      specialInstructions: ['']
    });

    // Set required address for delivery
    this.checkoutForm.get('orderType')?.valueChanges.subscribe(type => {
      const addressControl = this.checkoutForm.get('address');
      if (type === 'delivery') {
        addressControl?.setValidators([Validators.required]);
      } else {
        addressControl?.clearValidators();
      }
      addressControl?.updateValueAndValidity();
    });
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    this.cartService.updateQuantity(
      item.id, 
      newQuantity, 
      item.specialInstructions
    );
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id, item.specialInstructions);
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    this.showCheckout = true;
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const orderData = {
      ...this.checkoutForm.value,
      orderType: this.orderType,
      items: this.cartItems,
      total: this.cartTotal,
      orderDate: new Date().toISOString()
    };

    // In production, this would be an API call
    console.log('Order placed:', orderData);
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  continueShopping(): void {
    this.router.navigate(['/menu']);
  }
}

