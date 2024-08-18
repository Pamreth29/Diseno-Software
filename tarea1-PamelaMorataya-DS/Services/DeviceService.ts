//Pamela Morataya Sandoval - 2022108818

export class DeviceService {
    static getDeviceType(userAgent: string): string {
      if (/mobile/i.test(userAgent)) {
        return 'mobile';
      } else if (/tablet/i.test(userAgent)) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    }
  }
  