import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAggregationComponent } from './feedback-aggregation.component';

describe('FeedbackAggregationComponent', () => {
  let component: FeedbackAggregationComponent;
  let fixture: ComponentFixture<FeedbackAggregationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackAggregationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAggregationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
