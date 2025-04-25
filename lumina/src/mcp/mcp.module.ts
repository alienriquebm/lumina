import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { CustomersModule } from 'src/customers/customers.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [CustomersModule, GeminiModule],
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
