import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosModalComponent } from './photos-modal.component';

describe('PhotosModalComponent', () => {
  let component: PhotosModalComponent;
  let fixture: ComponentFixture<PhotosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
