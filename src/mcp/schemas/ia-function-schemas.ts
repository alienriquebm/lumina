import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export const AddNoteToCustomerSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
  note: z.string().min(1, 'Note cannot be empty'),
});
