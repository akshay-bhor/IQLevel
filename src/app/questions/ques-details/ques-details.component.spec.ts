import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesDetailsComponent } from './ques-details.component';

describe('QuesDetailsComponent', () => {
  let component: QuesDetailsComponent;
  let fixture: ComponentFixture<QuesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
