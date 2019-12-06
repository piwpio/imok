import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaveMapComponent } from './slave-map.component';

describe('SlaveMapComponent', () => {
  let component: SlaveMapComponent;
  let fixture: ComponentFixture<SlaveMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaveMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
