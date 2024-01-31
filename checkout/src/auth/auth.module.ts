import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@/auth/auth.controller';
import { AuthGuard } from '@/auth/auth.guard';
import { AuthService } from '@/auth/auth.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
