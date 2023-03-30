import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HhService } from './hh.service';

@Module({
  providers: [HhService],
  imports: [ConfigService, HttpModule],
  exports: [HhService],
})
export class HhModule {}
