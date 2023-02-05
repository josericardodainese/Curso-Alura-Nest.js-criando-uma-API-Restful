import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validators/unique-email.validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'Informe um e-mail válido' })
  @EmailIsUnique({ message: 'ja existe um usuário com este e-mail' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 3 caracteres' })
  @IsOptional()
  password: string;
}
