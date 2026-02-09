import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  galleryImages = [
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', title: 'Restaurant Interior' },
    { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', title: 'Main Dining Room' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', title: 'Signature Dish' },
    { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800', title: 'Chef at Work' },
    { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800', title: 'Elegant Presentation' },
    { url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800', title: 'Delicious Desserts' },
    { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', title: 'Fresh Ingredients' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', title: 'Bar Area' },
    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', title: 'Gourmet Plating' }
  ];

  selectedImage: { url: string; title: string } | null = null;

  openLightbox(image: { url: string; title: string }): void {
    this.selectedImage = image;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}

