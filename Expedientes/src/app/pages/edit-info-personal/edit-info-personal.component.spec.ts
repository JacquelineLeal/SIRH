import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoPersonalComponent } from './edit-info-personal.component';

describe('EditInfoPersonalComponent', () => {
  let component: EditInfoPersonalComponent;
  let fixture: ComponentFixture<EditInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
