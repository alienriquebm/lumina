import { IsNotEmpty } from 'class-validator';

export class AddNoteDto {
  @IsNotEmpty()
  note: string;
}
