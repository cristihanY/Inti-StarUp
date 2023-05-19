import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidounitarioComponent } from './pedidounitario.component';

describe('PedidounitarioComponent', () => {
  let component: PedidounitarioComponent;
  let fixture: ComponentFixture<PedidounitarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidounitarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidounitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
