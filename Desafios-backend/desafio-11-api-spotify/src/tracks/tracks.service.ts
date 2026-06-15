import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrackDto) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: dto.artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    if (dto.albumId) {
      const album = await this.prisma.album.findUnique({
        where: { id: dto.albumId },
      });

      if (!album) {
        throw new NotFoundException('Album not found');
      }

      if (album.artistId !== dto.artistId) {
        throw new ConflictException(
          'Album does not belong to the selected artist',
        );
      }
    }

    const exists = await this.prisma.track.findUnique({
      where: {
        title_artistId: {
          title: dto.title,
          artistId: dto.artistId,
        },
      },
    });

    if (exists) {
      throw new ConflictException('Track already exists for this artist');
    }

    const track = await this.prisma.track.create({
      data: dto,
      include: {
        artist: true,
        album: true,
      },
    });

    return {
      message: 'Track created successfully',
      data: track,
    };
  }

  async findAll(query: PaginationDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [tracks, total] = await Promise.all([
      this.prisma.track.findMany({
        skip,
        take: limit,
        include: {
          artist: true,
          album: true,
        },
      }),
      this.prisma.track.count(),
    ]);

    return {
      data: tracks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const track = await this.prisma.track.findUnique({
      where: { id },
      include: {
        artist: true,
        album: true,
      },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return { data: track };
  }

  async update(id: number, dto: UpdateTrackDto) {
    await this.findOne(id);

    const track = await this.prisma.track.update({
      where: { id },
      data: dto,
      include: {
        artist: true,
        album: true,
      },
    });

    return {
      message: 'Track updated successfully',
      data: track,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.track.delete({
      where: { id },
    });

    return {
      message: 'Track deleted successfully',
    };
  }

  async search(query: string) {
    if (!query) {
      return {
        data: [],
      };
    }

    const tracks = await this.prisma.track.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            artist: {
              name: {
                contains: query,
              },
            },
          },
        ],
      },
      include: {
        artist: true,
        album: true,
      },
    });

    return {
      data: tracks,
    };
  }

  async mostAddedRanking() {
    const ranking = await this.prisma.playlistTrack.groupBy({
      by: ['trackId'],
      _count: {
        trackId: true,
      },
      orderBy: {
        _count: {
          trackId: 'desc',
        },
      },
      take: 10,
    });

    const data = await Promise.all(
      ranking.map(async (item) => {
        const track = await this.prisma.track.findUnique({
          where: { id: item.trackId },
          include: {
            artist: true,
            album: true,
          },
        });

        return {
          track,
          totalAdded: item._count.trackId,
        };
      }),
    );

    return { data };
  }

  async recommendByGenre(genre: string) {
    const tracks = await this.prisma.track.findMany({
      where: {
        genre: {
          contains: genre,
        },
      },
      orderBy: {
        plays: 'desc',
      },
      take: 10,
      include: {
        artist: true,
        album: true,
      },
    });

    return { data: tracks };
  }
}