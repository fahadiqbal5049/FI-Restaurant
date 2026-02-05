import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  restaurantLocation = {
    address: '4 Jinnah Avenue, F 8/4 F-8, Islamabad, 44220',
    phone: '(555) 123-4567',
    email: 'info@restaurant.com',
    lat: 33.7077,
    lng: 73.0498
  };

  hours: { day: string; time: string }[] = [
    { day: 'Monday - Thursday', time: '11:00 AM - 10:00 PM' },
    { day: 'Friday - Saturday', time: '11:00 AM - 11:00 PM' },
    { day: 'Sunday', time: '12:00 PM - 9:00 PM' }
  ];

  mapEmbedUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log('Hours data:', this.hours);
    const lat = this.restaurantLocation.lat;
    const lng = this.restaurantLocation.lng;
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }

  getMapEmbedUrl(): SafeResourceUrl {
    return this.mapEmbedUrl;
  }

  getMapSearchUrl(): string {
    const encodedAddress = encodeURIComponent(this.restaurantLocation.address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  getOpenStreetMapUrl(): string {
    return `https://www.openstreetmap.org/?mlat=${this.restaurantLocation.lat}&mlon=${this.restaurantLocation.lng}&zoom=15`;
  }
}

