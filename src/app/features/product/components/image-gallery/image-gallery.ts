import { Component } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss'
})
export class ImageGallery {
    currentImage = 'https://placecats.com/neo/300/200';
    imageDescription = 'Demonstration image';
    isLoading = false;
    isSelected = true;
    searchTerm = '';
    placeholderText = 'Search an image...';
    }
