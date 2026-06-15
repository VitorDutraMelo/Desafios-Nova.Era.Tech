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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.tracksService.create(dto);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.tracksService.findAll(query);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.tracksService.search(query);
  }

  @Get('ranking/most-added')
  ranking() {
    return this.tracksService.mostAddedRanking();
  }

  @Get('recommendations/by-genre')
  recommendations(@Query('genre') genre: string) {
    return this.tracksService.recommendByGenre(genre);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tracksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrackDto) {
    return this.tracksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tracksService.remove(id);
  }
}