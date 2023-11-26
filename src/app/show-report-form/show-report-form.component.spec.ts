import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReportFormComponent } from './show-report-form.component';

describe('ShowReportFormComponent', () => {
  let component: ShowReportFormComponent;
  let fixture: ComponentFixture<ShowReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowReportFormComponent]
    });
    fixture = TestBed.createComponent(ShowReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
