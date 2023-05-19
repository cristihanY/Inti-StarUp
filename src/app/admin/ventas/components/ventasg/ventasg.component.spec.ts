import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasgComponent } from './ventasg.component';

describe('VentasgComponent', () => {
  let component: VentasgComponent;
  let fixture: ComponentFixture<VentasgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
