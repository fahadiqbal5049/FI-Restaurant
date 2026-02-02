import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients?: string[];
  allergens?: string[];
  dietaryTags?: string[]; // vegetarian, vegan, gluten-free, spicy
  spicyLevel?: number; // 0-5
  chefRecommendation?: boolean;
  popular?: boolean;
  available?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    // Appetizers
    {
      id: 1,
      name: 'Crispy Spring Rolls',
      description: 'Fresh vegetables wrapped in crispy pastry, served with sweet chili sauce',
      price: 8.99,
      category: 'Appetizers',
      image: 'https://images.unsplash.com/photo-1615367423051-73811731de4f?w=400',
      ingredients: ['Carrots', 'Cabbage', 'Mushrooms', 'Spring Roll Wrapper'],
      allergens: ['Gluten'],
      dietaryTags: ['vegetarian'],
      spicyLevel: 0,
      popular: true,
      available: true
    },
    {
      id: 2,
      name: 'Spicy Buffalo Wings',
      description: 'Crispy chicken wings tossed in our signature buffalo sauce',
      price: 12.99,
      category: 'Appetizers',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400',
      ingredients: ['Chicken Wings', 'Buffalo Sauce', 'Celery', 'Blue Cheese'],
      allergens: ['Dairy'],
      dietaryTags: [],
      spicyLevel: 4,
      chefRecommendation: true,
      available: true
    },
    {
      id: 3,
      name: 'Bruschetta Trio',
      description: 'Three varieties of bruschetta with fresh tomatoes, basil, and mozzarella',
      price: 10.99,
      category: 'Appetizers',
      image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400',
      ingredients: ['Bread', 'Tomatoes', 'Basil', 'Mozzarella', 'Garlic'],
      allergens: ['Gluten', 'Dairy'],
      dietaryTags: ['vegetarian'],
      spicyLevel: 0,
      available: true
    },
    // Main Courses
    {
      id: 4,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon grilled to perfection with lemon butter sauce, served with roasted vegetables',
      price: 24.99,
      category: 'Main Courses',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      ingredients: ['Salmon', 'Lemon', 'Butter', 'Asparagus', 'Potatoes'],
      allergens: ['Fish', 'Dairy'],
      dietaryTags: [],
      spicyLevel: 0,
      chefRecommendation: true,
      popular: true,
      available: true
    },
    {
      id: 5,
      name: 'Prime Rib Steak',
      description: '12oz prime rib cooked to your preference, served with mashed potatoes and seasonal vegetables',
      price: 32.99,
      category: 'Main Courses',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      ingredients: ['Beef Rib', 'Potatoes', 'Butter', 'Vegetables'],
      allergens: ['Dairy'],
      dietaryTags: [],
      spicyLevel: 0,
      available: true
    },
    {
      id: 6,
      name: 'Vegetarian Risotto',
      description: 'Creamy arborio rice with seasonal vegetables, parmesan, and fresh herbs',
      price: 18.99,
      category: 'Main Courses',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
      ingredients: ['Arborio Rice', 'Vegetables', 'Parmesan', 'Herbs', 'White Wine'],
      allergens: ['Dairy', 'Gluten'],
      dietaryTags: ['vegetarian'],
      spicyLevel: 0,
      available: true
    },
    {
      id: 7,
      name: 'Spicy Thai Curry',
      description: 'Aromatic Thai curry with your choice of chicken or tofu, coconut milk, and jasmine rice',
      price: 19.99,
      category: 'Main Courses',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
      ingredients: ['Curry Paste', 'Coconut Milk', 'Chicken/Tofu', 'Vegetables', 'Jasmine Rice'],
      allergens: [],
      dietaryTags: ['gluten-free'],
      spicyLevel: 4,
      popular: true,
      available: true
    },
    // Desserts
    {
      id: 8,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      price: 9.99,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
      ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Ice Cream'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      dietaryTags: [],
      spicyLevel: 0,
      chefRecommendation: true,
      popular: true,
      available: true
    },
    {
      id: 9,
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
      price: 8.99,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
      ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa', 'Sugar'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      dietaryTags: [],
      spicyLevel: 0,
      available: true
    },
    {
      id: 10,
      name: 'Fresh Fruit Platter',
      description: 'Seasonal selection of fresh fruits with mint and honey drizzle',
      price: 7.99,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400',
      ingredients: ['Mixed Fruits', 'Mint', 'Honey'],
      allergens: [],
      dietaryTags: ['vegan', 'gluten-free', 'vegetarian'],
      spicyLevel: 0,
      available: true
    },
    // Beverages
    {
      id: 11,
      name: 'Craft Cocktail - Signature Mojito',
      description: 'Fresh mint, lime, white rum, and soda water',
      price: 12.99,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400',
      ingredients: ['Mint', 'Lime', 'Rum', 'Soda Water'],
      allergens: [],
      dietaryTags: ['gluten-free'],
      spicyLevel: 0,
      available: true
    },
    {
      id: 12,
      name: 'Wine Selection',
      description: 'Ask your server for our current wine list featuring local and imported selections',
      price: 8.99,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
      ingredients: ['Grapes'],
      allergens: [],
      dietaryTags: ['gluten-free', 'vegan'],
      spicyLevel: 0,
      available: true
    },
    {
      id: 13,
      name: 'Fresh Lemonade',
      description: 'Freshly squeezed lemons, sugar, and sparkling water',
      price: 4.99,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=400',
      ingredients: ['Lemons', 'Sugar', 'Sparkling Water'],
      allergens: [],
      dietaryTags: ['vegan', 'gluten-free'],
      spicyLevel: 0,
      popular: true,
      available: true
    },
    // Specials
    {
      id: 14,
      name: 'Chef\'s Special Pasta',
      description: 'Daily chef special pasta with seasonal ingredients and house-made sauce',
      price: 22.99,
      category: 'Specials',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
      ingredients: ['Fresh Pasta', 'Seasonal Ingredients', 'House Sauce', 'Parmesan'],
      allergens: ['Gluten', 'Dairy'],
      dietaryTags: ['vegetarian'],
      spicyLevel: 1,
      chefRecommendation: true,
      available: true
    }
  ];

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    // In production, this would be an HTTP call
    return of(this.menuItems);
  }

  getMenuByCategory(category: string): Observable<MenuItem[]> {
    const filtered = this.menuItems.filter(item => item.category === category);
    return of(filtered);
  }

  getMenuItem(id: number): Observable<MenuItem | undefined> {
    const item = this.menuItems.find(i => i.id === id);
    return of(item);
  }

  searchMenuItems(query: string): Observable<MenuItem[]> {
    const searchTerm = query.toLowerCase();
    const filtered = this.menuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
    return of(filtered);
  }

  filterByDietary(dietaryTags: string[]): Observable<MenuItem[]> {
    const filtered = this.menuItems.filter(item =>
      dietaryTags.some(tag => item.dietaryTags?.includes(tag))
    );
    return of(filtered);
  }

  getCategories(): string[] {
    return ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Specials'];
  }
}

