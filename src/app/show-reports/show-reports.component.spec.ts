import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReportsComponent } from './show-reports.component';

describe('ShowReportsComponent', () => {
  let component: ShowReportsComponent;
  let fixture: ComponentFixture<ShowReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowReportsComponent]
    });
    fixture = TestBed.createComponent(ShowReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
