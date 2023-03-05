import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProductCharacteristicDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  advantages: string;

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicDto[];

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsNumber()
  credit: number;

  @IsString()
  description: string;

  @IsString()
  disAdvantages: string;

  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;
}
