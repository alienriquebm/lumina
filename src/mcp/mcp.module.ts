import { Module } from '@nestjs/common';
import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
