//Pamela Morataya Sandoval - 2022108818

export interface IDeviceHandler {
    handleRequest(productId: string): string;
    renderProduct(productId: string): string;
  }
  