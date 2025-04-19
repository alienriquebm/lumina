/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';
import {
  CreateCustomerSchema,
  AddNoteToCustomerSchema,
} from './schemas/ia-function-schemas';

export function validateFunctionParameters(
  fn: string,
  params: any,
): { valid: boolean; data?: any; errors?: string[] } {
  let result: z.SafeParseReturnType<any, any>;

  switch (fn) {
    case 'createCustomer':
      result = CreateCustomerSchema.safeParse(params);
      break;

    case 'addNoteToCustomer':
      result = AddNoteToCustomerSchema.safeParse(params);
      break;

    default:
      return { valid: true, data: params };
  }

  if (!result.success) {
    return {
      valid: false,
      errors: Object.values(result.error.flatten().fieldErrors).flatMap(
        (arr) => arr ?? [],
      ),
    };
  }

  return { valid: true, data: result.data };
}
