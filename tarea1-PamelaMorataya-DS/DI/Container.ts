import { MobileHandler } from '../Devices/MobileHandler';
import { DesktopHandler } from '../Devices/DesktopHandler';
import { TabletHandler } from '../Devices/TabletHandler';
import { DeviceHandler } from '../Devices/DeviceHandler';

const deviceHandlers: { [key: string]: DeviceHandler } = {
  'mobile': MobileHandler.getInstance(),
  'desktop': DesktopHandler.getInstance(),
  'tablet': TabletHandler.getInstance()
};

export class Container {
  static resolve(deviceType: string): DeviceHandler {
    return deviceHandlers[deviceType] || deviceHandlers['desktop'];
  }

  static getDeviceHandlers() {
    return deviceHandlers;
  }
}
