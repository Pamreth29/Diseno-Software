//Pamela Morataya Sandoval - 2022108818

import { Request, Response } from 'express';
import { Container } from '../DI/Container';
import { DeviceService } from '../Services/DeviceService';
import { ProductRenderer } from '../Renderers/ProductRenderer';

const deviceHandlers = Container.getDeviceHandlers();
const productRenderer = new ProductRenderer(deviceHandlers);

export class ProductController {
  static async getProduct(req: Request, res: Response) {
    try {
      const userAgent = req.headers['user-agent'] || '';
      const deviceType = DeviceService.getDeviceType(userAgent);

      const productId = req.params.id;
      if (!productId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const responseHtml = productRenderer.renderProduct(deviceType, productId);
      res.status(200).send(responseHtml);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}


