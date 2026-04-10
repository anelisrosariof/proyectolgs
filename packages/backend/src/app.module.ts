import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './db/prisma.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [PrismaModule, EventoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
