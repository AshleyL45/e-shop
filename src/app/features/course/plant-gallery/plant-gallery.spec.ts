import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantGallery } from './plant-gallery';

describe('PlantGallery', () => {
  let component: PlantGallery;
  let fixture: ComponentFixture<PlantGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
