import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AddNoteDto } from 'src/mcp/dto/add-note.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Post(':id/notes')
  addNote(@Param('id') id: string, @Body() addNoteDto: AddNoteDto) {
    return this.customersService.addNote(Number(id), addNoteDto);
  }
}
