import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationItemComponent } from './registration-item.component';

describe('RegistrationItemComponent', () => {
  let component: RegistrationItemComponent;
  let fixture: ComponentFixture<RegistrationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
