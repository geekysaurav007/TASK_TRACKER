import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallListComponent } from './getall-list.component';

describe('GetallListComponent', () => {
  let component: GetallListComponent;
  let fixture: ComponentFixture<GetallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
