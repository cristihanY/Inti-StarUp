import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypedidoComponent } from './mypedido.component';

describe('MypedidoComponent', () => {
  let component: MypedidoComponent;
  let fixture: ComponentFixture<MypedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
