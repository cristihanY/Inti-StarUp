import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasgEditComponent } from './ventasg-edit.component';

describe('VentasgEditComponent', () => {
  let component: VentasgEditComponent;
  let fixture: ComponentFixture<VentasgEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasgEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
