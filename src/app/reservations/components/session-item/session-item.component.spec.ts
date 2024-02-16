import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionItemComponent } from './session-item.component';

describe('SessionItemComponent', () => {
  let component: SessionItemComponent;
  let fixture: ComponentFixture<SessionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionItemComponent]
    });
    fixture = TestBed.createComponent(SessionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
