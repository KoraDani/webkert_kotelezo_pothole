import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotholeComponent } from './pothole.component';

describe('PotholeComponent', () => {
  let component: PotholeComponent;
  let fixture: ComponentFixture<PotholeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotholeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotholeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
