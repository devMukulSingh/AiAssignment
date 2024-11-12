import { Module } from "@nestjs/common";
import { BotSettingsController } from "./botSettings.controller";
import { BotSettingsService } from "./botSettings.service";


@Module({
    controllers:[BotSettingsController],
    providers:[BotSettingsService],
    
})

export class BotSettingsModule{

}