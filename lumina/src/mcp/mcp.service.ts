import { Injectable } from '@nestjs/common';

@Injectable()
export class McpService {
  getAvailableFunctions() {
    return [
      {
        name: 'getAllCustomers',
        description: 'Returns the full list of customers.',
        parameters: [],
      },
      {
        name: 'addNoteToCustomer',
        description: 'Adds a note to a customer by ID.',
        parameters: [
          { name: 'id', type: 'number' },
          { name: 'note', type: 'string' },
        ],
      },
      {
        name: 'createCustomer',
        description: 'Creates a new customer with a name and email.',
        parameters: [
          { name: 'name', type: 'string' },
          { name: 'email', type: 'string' },
        ],
      },
      {
        name: 'getCustomerCount',
        description: 'Returns the total number of customers.',
        parameters: [],
      },
    ];
  }
}
