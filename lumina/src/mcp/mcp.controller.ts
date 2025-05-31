import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from 'src/customers/customers.service';
import { McpService } from './mcp.service';
import { ExecuteFunctionDto } from './dto/execute-function.dto';
import { validateFunctionParameters } from './validate-mcp-input';
import {
  AddNoteToCustomerSchema,
  CreateCustomerSchema,
} from './schemas/ia-function-schemas';
import { GeminiService } from 'src/gemini/gemini.service';

type CreateCustomerInput = (typeof CreateCustomerSchema)['_type'];
type AddNoteToCustomerInput = (typeof AddNoteToCustomerSchema)['_type'];

@Controller('mcp')
export class McpController {
  constructor(
    private readonly mcpService: McpService,
    private readonly customersService: CustomersService,
    private readonly geminiService: GeminiService,
  ) {}

  @Get('functions')
  getFunctions() {
    return this.mcpService.getAvailableFunctions();
  }

  @Post('execute')
  async execute(@Body() body: ExecuteFunctionDto) {
    const validation = validateFunctionParameters(
      body.function,
      body.parameters,
    );

    if (!validation.valid) {
      return {
        error: 'Invalid parameters',
        details: validation.errors,
      };
    }

    switch (body.function) {
      case 'getAllCustomers':
        return this.customersService.findAll();

      case 'addNoteToCustomer': {
        const params = validation.data as AddNoteToCustomerInput;
        return this.customersService.addNote(params.id, { note: params.note });
      }

      case 'createCustomer': {
        const params = validation.data as CreateCustomerInput;
        return this.customersService.create(params);
      }

      case 'getCustomerCount': {
        const customers = await this.customersService.findAll();
        return { count: customers.length };
      }

      default:
        return { error: 'Function not supported' };
    }
  }
  @Post('interpret')
  async interpretPrompt(@Body() body: { prompt: string }) {
    const { prompt } = body;
    const response = await this.geminiService.interpretPrompt(prompt);
    return { response };
  }
}
