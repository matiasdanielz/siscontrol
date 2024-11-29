import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingBlockComponent } from './reading-block.component';

describe('ReadingBlockComponent', () => {
  let component: ReadingBlockComponent;
  let fixture: ComponentFixture<ReadingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
