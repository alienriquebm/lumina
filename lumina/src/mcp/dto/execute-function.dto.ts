import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { AddNoteDto } from './add-note.dto';

export type ExecuteFunctionDto =
  | {
      function: 'getAllCustomers';
      parameters: object;
    }
  | {
      function: 'addNoteToCustomer';
      parameters: { id: number } & AddNoteDto;
    }
  | {
      function: 'createCustomer';
      parameters: CreateCustomerDto;
    }
  | {
      function: 'getCustomerCount';
      parameters: object;
    };
