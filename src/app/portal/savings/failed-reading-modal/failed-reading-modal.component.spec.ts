import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedReadingModalComponent } from './failed-reading-modal.component';

describe('FailedReadingModalComponent', () => {
  let component: FailedReadingModalComponent;
  let fixture: ComponentFixture<FailedReadingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedReadingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedReadingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
