import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsOptional()
  country?: string;
}