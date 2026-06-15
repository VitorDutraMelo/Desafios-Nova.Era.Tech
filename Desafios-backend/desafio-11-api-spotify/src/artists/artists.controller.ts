import { Controller, Get } from '@nestjs/common';

@Controller('artists')
export class ArtistsController {
  @Get()
  findAll() {
    return {
      message: 'Artists endpoint working',
    };
  }
}