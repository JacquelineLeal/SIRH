import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegitroInfoEscolarComponent } from './regitro-info-escolar.component';

describe('RegitroInfoEscolarComponent', () => {
  let component: RegitroInfoEscolarComponent;
  let fixture: ComponentFixture<RegitroInfoEscolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegitroInfoEscolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegitroInfoEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
