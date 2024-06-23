import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturEventListComponent } from './event-list.component';

describe('EventListComponent', () => {
  let component: FuturEventListComponent;
  let fixture: ComponentFixture<FuturEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuturEventListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuturEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
