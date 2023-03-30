import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class TopPageAdvantageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class HhDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;

  @IsDate()
  updatedAt?: Date;
}

export class CreateTopPageDto {
  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsString()
  alias: string;

  @IsString()
  category: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => HhDataDto)
  hh?: HhDataDto;

  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  seoText: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  tagsTitle: string;

  @IsString()
  title: string;
}
