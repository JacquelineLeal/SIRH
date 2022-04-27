import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoNewDataComponent } from './consulto-new-data.component';

describe('ConsultoNewDataComponent', () => {
  let component: ConsultoNewDataComponent;
  let fixture: ComponentFixture<ConsultoNewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultoNewDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultoNewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
