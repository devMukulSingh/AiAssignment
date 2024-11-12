import { IsNotEmpty, IsString } from "class-validator"



export class IBotDto{
    @IsString()
    @IsNotEmpty()
    name:string
    description:string
    about:string
}