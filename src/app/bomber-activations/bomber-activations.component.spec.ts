import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomberActivationsComponent } from './bomber-activations.component';

describe('BomberActivationsComponent', () => {
  let component: BomberActivationsComponent;
  let fixture: ComponentFixture<BomberActivationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomberActivationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomberActivationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
