import { Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";


@Controller('auth')

export class AuthController{
    constructor(private authService:AuthService){}

    @Post('sign-up')
    signup(@Req() req:Request ,@Res() res:Response){
    }

    @Post('sign-in')
    signin(@Req() req:Request){
    }
}