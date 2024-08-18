
//Pamela Morataya Sandoval - 2022108818

import { IDeviceHandler } from '../Interfaces/iDeviceHandler';
import { Product } from '../Models/Product';

export abstract class DeviceHandler implements IDeviceHandler {

  abstract handleRequest(productId: string): string;
  abstract renderProduct(productId: string): string;

  protected getProduct(productId: string): Product {
    // Aquí se debería consultar a una base de datos real
    return new Product(
      productId, 
      'Producto Ejemplo', 
      'Descripción del producto', 
      100, 
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/video',
      'https://via.placeholder.com/360view'
    );
  }
}
