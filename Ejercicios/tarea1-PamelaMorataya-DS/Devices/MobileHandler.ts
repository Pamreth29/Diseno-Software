//Pamela Morataya Sandoval - 2022108818

import { DeviceHandler } from './DeviceHandler';

export class MobileHandler extends DeviceHandler {
  private static instance: MobileHandler;

  private constructor() {
    super();
  }

  public static getInstance(): MobileHandler {
    if (!MobileHandler.instance) {
      MobileHandler.instance = new MobileHandler();
    }
    return MobileHandler.instance;
  }

  handleRequest(productId: string): string {
    const product = this.getProduct(productId);
    return `<div>
      <h1>${product.name}</h1>
      <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px;">
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
    </div>`;
  }

  renderProduct(productId: string): string {
    const product = this.getProduct(productId);
    return `<div>
      <h1>${product.name} - ${product.function}</h1>
      <p>${product.description}</p>
    </div>`;
  }
}
