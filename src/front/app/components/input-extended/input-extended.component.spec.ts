import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputExtendedComponent } from './input-extended.component';

describe('InputExtendedComponent', () => {
  let component: InputExtendedComponent;
  let fixture: ComponentFixture<InputExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputExtendedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
