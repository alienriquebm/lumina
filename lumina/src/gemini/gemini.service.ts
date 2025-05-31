import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private getSystemPrompt(): string {
    return `
You are Lumina, an intelligent backend assistant. Your job is to read the user's prompt and output only a JSON payload to call a backend function.

Respond strictly using this format:

\`\`\`json
{
  "function": "functionName",
  "parameters": {
    // required parameters
  }
}
\`\`\`

Available functions:

1. getAllCustomers — no parameters  
2. createCustomer — parameters: name (string), email (string)  
3. addNoteToCustomer — parameters: id (number), note (string)
4. getCustomerCount — no parameters

🛑 Do not explain.  
🛑 Do not ask questions.  
✅ Reply only with a valid JSON block inside triple backticks.  
✅ If unsure, respond: "INVALID"
`;
  }

  async interpretPrompt(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const response = await model.generateContent([
      { text: this.getSystemPrompt() },
      { text: prompt },
    ]);

    let text = response.response.text();

    text = text
      .replace(/^\s*```json\s*/i, '')
      .replace(/^\s*```\s*/i, '')
      .replace(/\s*```\s*$/, '');

    return text;
  }
}
