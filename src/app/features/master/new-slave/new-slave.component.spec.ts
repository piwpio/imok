import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSlaveComponent } from './new-slave.component';

describe('NewSlaveComponent', () => {
  let component: NewSlaveComponent;
  let fixture: ComponentFixture<NewSlaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSlaveComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSlaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
