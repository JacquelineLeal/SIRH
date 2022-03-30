import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirDocsExpedienteComponent } from './subir-docs-expediente.component';

describe('SubirDocsExpedienteComponent', () => {
  let component: SubirDocsExpedienteComponent;
  let fixture: ComponentFixture<SubirDocsExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirDocsExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirDocsExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
