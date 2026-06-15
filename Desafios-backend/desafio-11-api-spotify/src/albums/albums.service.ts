import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: dto.artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const exists = await this.prisma.album.findUnique({
      where: {
        title_artistId: {
          title: dto.title,
          artistId: dto.artistId,
        },
      },
    });

    if (exists) {
      throw new ConflictException('Album already exists for this artist');
    }

    const album = await this.prisma.album.create({
      data: dto,
      include: {
        artist: true,
        tracks: true,
      },
    });

    return {
      message: 'Album created successfully',
      data: album,
    };
  }

  async findAll(query: PaginationDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [albums, total] = await Promise.all([
      this.prisma.album.findMany({
        skip,
        take: limit,
        include: {
          artist: true,
          tracks: true,
        },
      }),
      this.prisma.album.count(),
    ]);

    return {
      data: albums,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const album = await this.prisma.album.findUnique({
      where: { id },
      include: {
        artist: true,
        tracks: true,
      },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return { data: album };
  }

  async update(id: number, dto: UpdateAlbumDto) {
    await this.findOne(id);

    const album = await this.prisma.album.update({
      where: { id },
      data: dto,
      include: {
        artist: true,
        tracks: true,
      },
    });

    return {
      message: 'Album updated successfully',
      data: album,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.album.delete({
      where: { id },
    });

    return {
      message: 'Album deleted successfully',
    };
  }
}