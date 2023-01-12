import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('registration')
  async registration(@Body() dto: AuthDto) {
    //
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    //
  }
}
