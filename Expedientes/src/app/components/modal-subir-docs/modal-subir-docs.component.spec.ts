import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSubirDocsComponent } from './modal-subir-docs.component';




describe('ModalSubirDocsComponent', () => {
  let component: ModalSubirDocsComponent;
  let fixture: ComponentFixture<ModalSubirDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSubirDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubirDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
