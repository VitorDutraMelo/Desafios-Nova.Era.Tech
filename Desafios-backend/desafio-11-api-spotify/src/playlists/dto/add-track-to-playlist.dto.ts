import { IsInt } from 'class-validator';

export class AddTrackToPlaylistDto {
  @IsInt()
  trackId: number;
}