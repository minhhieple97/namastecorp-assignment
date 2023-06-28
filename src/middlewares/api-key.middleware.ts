import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: () => void) {
    const environment = this.configService.get<string>('NODE_ENV');
    if (environment === 'PRODUCTION') {
      const apiKey = Array.isArray(req.headers['x-api-key'])
        ? req.headers['x-api-key'][0]
        : req.headers['x-api-key'];

      if (!apiKey) {
        return res.status(401).json({ message: 'API key required' });
      }
      const user = await this.userService.findByApiKey(apiKey);
      if (!user) {
        return res.status(401).json({ message: 'Invalid API key' });
      }
      req.userId = user.id;
    } else {
      req.userId = 1;
    }
    next();
  }
}
