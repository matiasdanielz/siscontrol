import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominiumComponent } from './condominium.component';

describe('CondominiumComponent', () => {
  let component: CondominiumComponent;
  let fixture: ComponentFixture<CondominiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondominiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondominiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
