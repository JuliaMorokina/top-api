import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    const saveFilesArr: MFile[] = [new MFile(file)];

    if (file.mimetype.includes('image')) {
      const webp = await this.filesService.convertToWebP(file.buffer);
      saveFilesArr.push(
        new MFile({
          buffer: webp,
          originalname: `${file.originalname.split('.')[0]}.webp`,
        }),
      );
    }

    return this.filesService.saveFiles(saveFilesArr);
  }
}
