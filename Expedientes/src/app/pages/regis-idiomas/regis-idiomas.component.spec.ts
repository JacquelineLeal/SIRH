import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisIdiomasComponent } from './regis-idiomas.component';

describe('RegisIdiomasComponent', () => {
  let component: RegisIdiomasComponent;
  let fixture: ComponentFixture<RegisIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisIdiomasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
