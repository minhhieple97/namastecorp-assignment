import { Controller, Post, Body, Get } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './request.entity';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  async findAll(): Promise<Request[]> {
    return this.requestService.findAll();
  }
}
