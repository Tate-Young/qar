import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QarListComponent } from './qar-list.component';

describe('QarListComponent', () => {
  let component: QarListComponent;
  let fixture: ComponentFixture<QarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
