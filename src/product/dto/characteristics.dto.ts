import { IsNotEmpty } from 'class-validator';
export class CharacteristicsDto {
  @IsNotEmpty({ message: 'The product characteristics should have a name.' })
  name: string;
  @IsNotEmpty({
    message: 'The product characteristics should have a description.',
  })
  description: string;
}
