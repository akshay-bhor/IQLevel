import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueDialogComponent } from './continue-dialog.component';

describe('ContinueDialogComponent', () => {
  let component: ContinueDialogComponent;
  let fixture: ComponentFixture<ContinueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
