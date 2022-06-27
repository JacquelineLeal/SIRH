import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CualQuincenaLesPagaronComponent } from './cual-quincena-les-pagaron.component';

describe('CualQuincenaLesPagaronComponent', () => {
  let component: CualQuincenaLesPagaronComponent;
  let fixture: ComponentFixture<CualQuincenaLesPagaronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CualQuincenaLesPagaronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CualQuincenaLesPagaronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
