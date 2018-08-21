import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsOfTokenComponent } from './rounds-of-token.component';

describe('RoundsOfTokenComponent', () => {
  let component: RoundsOfTokenComponent;
  let fixture: ComponentFixture<RoundsOfTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundsOfTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsOfTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
