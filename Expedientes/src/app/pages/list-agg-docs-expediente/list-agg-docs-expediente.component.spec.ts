import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAggDocsExpedienteComponent } from './list-agg-docs-expediente.component';

describe('ListAggDocsExpedienteComponent', () => {
  let component: ListAggDocsExpedienteComponent;
  let fixture: ComponentFixture<ListAggDocsExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAggDocsExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAggDocsExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
