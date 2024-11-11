import { Controller, Delete, Get, Param, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { prisma } from "src/prisma/prisma";

@Controller('api/user')

export class AdminController {

    @Get('get-users')
    async getUsers(@Req() req: Request, @Res() res: Response) {
        const users = await prisma.user.findMany({

        })
        return res.status(200).json({
            data: users
        })
    }
    @Delete(':id/delete-user')
    async deleteUser( @Req() req:Request, @Param('id') id:string, @Res() res:Response){
        console.log(id);
        const user = await prisma.user.delete({
            where:{
                id
            }
        })
        return res.status(200).json({
            data:user,
            message:'User deleted'
        })
    }
}   
