import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyyComponent } from './buyy.component';

describe('BuyyComponent', () => {
  let component: BuyyComponent;
  let fixture: ComponentFixture<BuyyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
