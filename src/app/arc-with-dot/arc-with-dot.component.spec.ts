import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcWithDotComponent } from './arc-with-dot.component';

describe('ArcWithDotComponent', () => {
  let component: ArcWithDotComponent;
  let fixture: ComponentFixture<ArcWithDotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcWithDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcWithDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
