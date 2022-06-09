import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTramiteComponent } from './lista-tramite.component';

describe('ListaTramiteComponent', () => {
  let component: ListaTramiteComponent;
  let fixture: ComponentFixture<ListaTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTramiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
