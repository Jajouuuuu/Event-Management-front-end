import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventListComponent } from './past-event-list.component';

describe('PastEventListComponent', () => {
  let component: PastEventListComponent;
  let fixture: ComponentFixture<PastEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastEventListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
