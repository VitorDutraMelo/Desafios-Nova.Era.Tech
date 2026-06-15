import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PlaylistsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePlaylistDto) {
    const playlist = await this.prisma.playlist.create({
      data: dto,
    });

    return {
      message: 'Playlist created successfully',
      data: playlist,
    };
  }

  async findAll(query: PaginationDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [playlists, total] = await Promise.all([
      this.prisma.playlist.findMany({
        skip,
        take: limit,
        include: {
          tracks: {
            include: {
              track: {
                include: {
                  artist: true,
                  album: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.playlist.count(),
    ]);

    const data = playlists.map((playlist) => {
      const totalDuration = playlist.tracks.reduce(
        (sum, item) => sum + item.track.duration,
        0,
      );

      return {
        ...playlist,
        totalTracks: playlist.tracks.length,
        totalDuration,
      };
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        tracks: {
          include: {
            track: {
              include: {
                artist: true,
                album: true,
              },
            },
          },
        },
      },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const totalDuration = playlist.tracks.reduce(
      (sum, item) => sum + item.track.duration,
      0,
    );

    return {
      data: {
        ...playlist,
        totalTracks: playlist.tracks.length,
        totalDuration,
      },
    };
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    await this.findOne(id);

    const playlist = await this.prisma.playlist.update({
      where: { id },
      data: dto,
    });

    return {
      message: 'Playlist updated successfully',
      data: playlist,
    };
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.playlist.delete({
      where: { id },
    });

    return {
      message: 'Playlist deleted successfully',
    };
  }

  async addTrack(playlistId: number, trackId: number) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const exists = await this.prisma.playlistTrack.findUnique({
      where: {
        playlistId_trackId: {
          playlistId,
          trackId,
        },
      },
    });

    if (exists) {
      throw new ConflictException('Track already exists in this playlist');
    }

    const playlistTrack = await this.prisma.playlistTrack.create({
      data: {
        playlistId,
        trackId,
      },
      include: {
        track: {
          include: {
            artist: true,
            album: true,
          },
        },
      },
    });

    return {
      message: 'Track added to playlist successfully',
      data: playlistTrack,
    };
  }

  async removeTrack(playlistId: number, trackId: number) {
    const exists = await this.prisma.playlistTrack.findUnique({
      where: {
        playlistId_trackId: {
          playlistId,
          trackId,
        },
      },
    });

    if (!exists) {
      throw new NotFoundException('Track not found in this playlist');
    }

    await this.prisma.playlistTrack.delete({
      where: {
        playlistId_trackId: {
          playlistId,
          trackId,
        },
      },
    });

    return {
      message: 'Track removed from playlist successfully',
    };
  }
}