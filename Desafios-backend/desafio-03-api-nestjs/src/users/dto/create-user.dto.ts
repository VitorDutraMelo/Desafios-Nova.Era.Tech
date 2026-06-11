import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsIn(['admin', 'member'])
  role: string;
}