import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgToolbox } from './ng-toolbox';

describe('NgToolbox', () => {
  let component: NgToolbox;
  let fixture: ComponentFixture<NgToolbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgToolbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgToolbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
