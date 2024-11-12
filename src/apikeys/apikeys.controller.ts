import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiKeysService } from './apikeys.service';

@Controller('api/apikeys')
export class ApiKeysController {
  constructor(private apiKeysService: ApiKeysService) {}
  @Get('get-apikeys')
  async getApikeys(@Res() res: Response) {
    this.apiKeysService.getApikeys(res);
  }
}
