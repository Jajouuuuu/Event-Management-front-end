import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventsHeaderComponent } from './past-event-header.component';

describe('PastEventsHeaderComponent', () => {
  let component: PastEventsHeaderComponent;
  let fixture: ComponentFixture<PastEventsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastEventsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastEventsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
