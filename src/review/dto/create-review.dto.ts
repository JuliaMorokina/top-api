import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  description: string;

  @IsString()
  name: string;

  @Max(5)
  @Min(1, { message: 'Рейтинг не может быть менее 1' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;

  @IsString()
  title: string;
}
