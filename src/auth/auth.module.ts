import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports:[PrismaModule,JwtModule.register({})]
})
export class AuthModule {}
