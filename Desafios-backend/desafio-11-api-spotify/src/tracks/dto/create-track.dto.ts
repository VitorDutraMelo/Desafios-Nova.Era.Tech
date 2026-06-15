import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsInt()
  artistId: number;

  @IsOptional()
  @IsInt()
  albumId?: number;
}