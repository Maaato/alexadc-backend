import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller()
export class AppController {
  
  @Get()
  @HttpCode(HttpStatus.OK)
  getRoot(@Res() res: Response) {
    return res.json({
      name: require(process.cwd() + '/package.json').name,
      version: require(process.cwd() + '/package.json').version,
      status: 'up',
    });
  }
}
