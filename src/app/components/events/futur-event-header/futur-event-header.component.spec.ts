import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureEventsHeaderComponent } from './futur-event-header.component';

describe('FutureEventsHeaderComponent', () => {
  let component: FutureEventsHeaderComponent;
  let fixture: ComponentFixture<FutureEventsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FutureEventsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FutureEventsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
