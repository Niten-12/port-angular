import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-showcase',
  standalone: true,
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
  imports: [NgFor, NgIf, FormsModule],
  providers: [Location],
})
export class ShowcaseComponent {
  selectedItem: any;
  constructor(private location: Location) {}

  isMenuOpen = false;
  activePrimaryFilter = 'all';
  activeSecondaryFilter = 'all';

  primaryFilters = [
    { key: 'all', name: 'All' },
    { key: 'photos', name: 'Photos' },
    { key: 'videos', name: 'Videos' },
    { key: 'wedding', name: 'Wedding' },
    { key: 'portrait', name: 'Portrait' },
    { key: 'favorites', name: 'Favorites' },
  ];

  secondaryFilters: { key: string; name: string }[] = [];

  subcategoryFilters = {
    photos: [
      { key: 'all', name: 'All Photos' },
      { key: 'nature', name: 'Nature' },
      { key: 'vehicles', name: 'Vehicles' },
      { key: 'people', name: 'People' },
      { key: 'architecture', name: 'Architecture' },
      { key: 'fashion', name: 'Fashion' },
      { key: 'events', name: 'Events' },
      { key: 'animals', name: 'Animals' },
      { key: 'travel', name: 'Travel' },
      { key: 'others', name: 'Others' },
    ],
    videos: [
      { key: 'all', name: 'All Videos' },
      { key: 'events', name: 'Events' },
      { key: 'cinematic', name: 'Cinematic' },
      { key: 'travel', name: 'Travel' },
      { key: 'reels', name: 'Reels & Shorts' },
      { key: 'timelapse', name: 'Timelapse' },
    ],
    wedding: [
      { key: 'all', name: 'All Wedding' },
      { key: 'engagement', name: 'Engagement' },
      { key: 'haldi', name: 'Haldi' },
      { key: 'mehendi', name: 'Mehendi' },
      { key: 'reception', name: 'Reception' },
    ],
    portrait: [
      { key: 'all', name: 'All Portraits' },
      { key: 'individual', name: 'Individual' },
      { key: 'headshots', name: 'Headshots' },
      { key: 'group', name: 'Group' },
    ],
  };

  // Sample data - replace with your actual assets
  items = [
    {
      name: 'Mountain Sunset',
      path: 'assets/images/nature/sunset.jpg',
      type: 'photo',
      category: 'photos',
      subcategory: 'nature',
      favorite: false,
    },
    {
      name: 'Wedding Ceremony',
      path: 'assets/videos/wedding/ceremony.mp4',
      type: 'video',
      category: 'wedding',
      subcategory: 'reception',
      favorite: true,
    },
    {
      name: 'Bike',
      path: 'assets/images/DSC_6381.JPG',
      type: 'photo',
      category: 'photos',
      subcategory: 'vehicles',
      favorite: true,
    },
    // Add more items as needed...
  ];

  selectPrimaryFilter(filter: { key: string; name: string }) {
    this.activePrimaryFilter = filter.key;
    this.activeSecondaryFilter = 'all';

    if (
      this.subcategoryFilters[
        filter.key as keyof typeof this.subcategoryFilters
      ]
    ) {
      this.secondaryFilters =
        this.subcategoryFilters[
          filter.key as keyof typeof this.subcategoryFilters
        ];
    } else {
      this.secondaryFilters = [];
    }
  }

  get filteredItems() {
    return this.items.filter((item) => {
      // Primary filter logic
      const matchesPrimary =
        this.activePrimaryFilter === 'all' ||
        (this.activePrimaryFilter === 'favorites' && item.favorite) ||
        item.category === this.activePrimaryFilter;

      // Secondary filter logic
      const matchesSecondary =
        this.activeSecondaryFilter === 'all' ||
        item.subcategory === this.activeSecondaryFilter;

      return matchesPrimary && matchesSecondary;
    });
  }

  toggleFavorite(item: any) {
    item.favorite = !item.favorite;
    // Here you would typically also update your data store/backend
  }

  openModal(item: any) {
    this.selectedItem = item;
  }

  goBack() {
    this.location.back();
  }
}
