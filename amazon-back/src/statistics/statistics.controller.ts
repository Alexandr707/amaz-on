import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @HttpCode(200)
  @Get(':userId')
  async getMain(@Param('userId') userId: string) {
    return this.statisticsService.getMain(+userId);
  }
}
