import { DeviceHandler } from '../Devices/DeviceHandler';

export class ProductRenderer {
  private deviceHandlers: { [key: string]: DeviceHandler };

  constructor(deviceHandlers: { [key: string]: DeviceHandler }) {
    this.deviceHandlers = deviceHandlers;
  }

  renderProduct(deviceType: string, productId: string): string {
    const deviceHandler = this.deviceHandlers[deviceType] || this.deviceHandlers['desktop'];
    return deviceHandler.renderProduct(productId);
  }
}
