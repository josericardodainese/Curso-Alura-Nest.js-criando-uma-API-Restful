import { IsNotEmpty, IsUrl } from 'class-validator';
export class ImageDto {
  @IsUrl(undefined, { message: 'The product image should have a url.' })
  url: string;
  @IsNotEmpty({
    message: 'The product image should have a description.',
  })
  description: string;
}
