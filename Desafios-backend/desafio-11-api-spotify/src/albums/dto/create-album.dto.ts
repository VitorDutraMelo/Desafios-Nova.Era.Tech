import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1900)
  releaseYear: number;

  @IsInt()
  artistId: number;
}