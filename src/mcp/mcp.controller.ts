import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { McpService } from './mcp.service';
import { ExecuteFunctionDto } from './dto/execute-function.dto';

@Controller('mcp')
export class McpController {
  constructor(
    private readonly mcpService: McpService,
    private readonly customersService: CustomersService,
  ) {}

  @Get('functions')
  getFunctions() {
    return this.mcpService.getAvailableFunctions();
  }
  @Post('execute')
  execute(@Body() executeFunctionDto: ExecuteFunctionDto) {
    const { function: functionName, parameters } = executeFunctionDto;

    switch (functionName) {
      case 'getAllCustomers':
        return this.customersService.findAll();

      case 'addNoteToCustomer':
        return this.customersService.addNote(parameters.id, parameters);

      case 'createCustomer':
        return this.customersService.create(parameters);

      default:
        return { error: 'Function not supported' };
    }
  }
}
