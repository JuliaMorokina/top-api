import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { HhService } from 'src/hh/hh.service';
import { TopPageController } from './top-page.controller';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: { collection: 'TopPage' },
      },
    ]),
    HhService,
  ],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
