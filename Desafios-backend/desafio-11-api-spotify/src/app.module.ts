import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [
    PrismaModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    PlaylistsModule,
  ],
})
export class AppModule {}