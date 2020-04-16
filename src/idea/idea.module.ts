import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaEnity } from './idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEnity])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
