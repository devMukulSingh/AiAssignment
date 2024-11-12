import { Controller, Delete, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';

@Controller('api/user')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get('get-users')
  async getUsers(@Req() req: Request, @Res() res: Response) {
    return this.adminService.getUsers(res);
  }
  @Delete(':id/delete-user')
  async deleteUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    return this.adminService.deleteUser(id, res);
  }
}
