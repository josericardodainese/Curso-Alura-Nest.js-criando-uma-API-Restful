import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { CharacteristicsDto } from './characteristics.dto';
import { ImageDto } from './image.dto';
import { IsValidUserId } from '../validators/user-id.validator';

export class ProductDto {
  @IsValidUserId({ message: 'ID de usuário inválido' })
  usuarioId: string;

  @IsNotEmpty({ message: 'The product should have a name.' })
  name: string;

  @IsNumber(undefined, { message: 'The product price should be a number.' })
  @Min(1, { message: 'The product price should coast one bucks at least.' })
  price: number;

  @IsNumber(undefined, {
    message: 'The product quantity available should be a number.',
  })
  @Min(1, { message: 'The product quantity available should be one or more.' })
  quantity_available: number;

  @IsNotEmpty({ message: 'The product should have a description.' })
  description: string;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1, {
    message: 'The product should have at least one characteristics.',
  })
  @Type(() => CharacteristicsDto)
  characteristics: CharacteristicsDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1, {
    message: 'The product should have at least one image.',
  })
  @Type(() => ImageDto)
  images: ImageDto;

  @IsNotEmpty({ message: 'The product should have a category.' })
  category: string;

  @IsDateString()
  createdAt: Date = new Date();

  @IsDateString()
  updatedAt: Date = new Date();
}
