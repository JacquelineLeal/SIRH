import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoNewDataComponent } from './edito-new-data.component';

describe('EditoNewDataComponent', () => {
  let component: EditoNewDataComponent;
  let fixture: ComponentFixture<EditoNewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditoNewDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditoNewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
