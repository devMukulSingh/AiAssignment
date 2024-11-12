import { Body, Controller, Get, Put, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { BotSettingsService } from './botSettings.service';
import { IBotDto } from 'src/interfaces/dto.interface';

@Controller('api/bot')
export class BotSettingsController {
  constructor(private botService: BotSettingsService) {}

  @Put('edit-bot')
  editBot(@Req() req: Request, @Res() res: Response, @Body() botDto: IBotDto) {
    console.log(botDto);
    return this.botService.editBot(botDto, res);
  }
  @Get('get-botdetails')
  getBotDetails(@Req() req: Request, @Res() res: Response) {
    return this.botService.getBotDetails(res);
  }
}
