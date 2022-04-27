import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNewDataComponent } from './registro-new-data.component';

describe('RegistroNewDataComponent', () => {
  let component: RegistroNewDataComponent;
  let fixture: ComponentFixture<RegistroNewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroNewDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
