//Pamela Morataya Sandoval - 2022108818

import { DeviceHandler } from './DeviceHandler';

export class DesktopHandler extends DeviceHandler {
  private static instance: DesktopHandler;

  private constructor() {
    super();
  }

  public static getInstance(): DesktopHandler {
    if (!DesktopHandler.instance) {
      DesktopHandler.instance = new DesktopHandler();
    }
    return DesktopHandler.instance;
  }

  handleRequest(productId: string): string {
    const product = this.getProduct(productId);
    return `<div style="display: flex;">
      <div>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      </div>
      <img src="${product.imageUrl}" alt="${product.name}" style="width: 300px;">
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
