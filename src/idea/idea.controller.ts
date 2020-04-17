import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Logger,
} from '@nestjs/common';

import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger(IdeaController.name);
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  createIdea(@Body() data: IdeaDTO) {
    this.logger.log(`Request data : ${JSON.stringify(data)}`);
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Patch(':id')
  updateIda(@Param('id') id: string, @Body() data: IdeaDTO) {
    this.logger.log(`Request data : ${JSON.stringify(data)}`);
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroyIda(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
