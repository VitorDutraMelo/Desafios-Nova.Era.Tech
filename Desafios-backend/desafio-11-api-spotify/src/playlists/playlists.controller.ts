import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddTrackToPlaylistDto } from './dto/add-track-to-playlist.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() dto: CreatePlaylistDto) {
    return this.playlistsService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.playlistsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playlistsService.remove(id);
  }

  @Post(':id/tracks')
  addTrack(
    @Param('id', ParseIntPipe) playlistId: number,
    @Body() dto: AddTrackToPlaylistDto,
  ) {
    return this.playlistsService.addTrack(playlistId, dto.trackId);
  }

  @Delete(':id/tracks/:trackId')
  removeTrack(
    @Param('id', ParseIntPipe) playlistId: number,
    @Param('trackId', ParseIntPipe) trackId: number,
  ) {
    return this.playlistsService.removeTrack(playlistId, trackId);
  }
}