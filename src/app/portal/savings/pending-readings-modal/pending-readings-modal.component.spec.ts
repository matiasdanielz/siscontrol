import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReadingsModalComponent } from './pending-readings-modal.component';

describe('PendingReadingsModalComponent', () => {
  let component: PendingReadingsModalComponent;
  let fixture: ComponentFixture<PendingReadingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingReadingsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingReadingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
