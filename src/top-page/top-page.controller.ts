import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { HhService } from 'src/hh/hh.service';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(
    private readonly topPageService: TopPageService,
    private readonly hhService: HhService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @Get('by-alias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPage = await this.topPageService.delete(id);

    if (!deletedPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    const updatedPage = await this.topPageService.update(id, dto);

    if (!updatedPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }
    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() { firstCategory }: FindTopPageDto) {
    return this.topPageService.find(firstCategory);
  }

  @Get('search/:text')
  async textSearch(@Param('text') text: string) {
    const topPage = await this.topPageService.findByText(text);

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
    }

    return topPage;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'test' })
  async test() {
    const data = await this.topPageService.findForHhUpdate(new Date());

    for (const page of data) {
      const hhData = await this.hhService.getData(page.category);
      page.hh = hhData;

      await this.topPageService.update(page._id, page);
    }
  }
}
