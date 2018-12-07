import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcGraphPageComponent } from './arc-graph-page.component';

describe('ArcGraphPageComponent', () => {
  let component: ArcGraphPageComponent;
  let fixture: ComponentFixture<ArcGraphPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcGraphPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
