import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Mahasiswa } from './schema';

@Controller('mahasiswa')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(200)
  createMahasiswa(@Body() body: Mahasiswa): Promise<Mahasiswa> {
    return this.appService.createMahasiswa(body);
  }
}
