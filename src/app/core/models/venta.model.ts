import * as internal from "events";
import {ItemVenta} from './itemVenta.model'

export interface Venta {
  purchaseId?: number;
  clienteId: string;
  date?: string;
  paymentMethod: string;
  comment: string;
  state: string;
  items:  ItemVenta[];
}
