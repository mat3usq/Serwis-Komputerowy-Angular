import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLogsComponent } from './display-logs.component';

describe('DisplayLogsComponent', () => {
  let component: DisplayLogsComponent;
  let fixture: ComponentFixture<DisplayLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
