import axios from 'axios';
import * as readline from 'readline';
import { ExecuteFunctionDto } from '../src/mcp/dto/execute-function.dto';

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  try {
    const input = await ask('💬 Paste your JSON request for Lumina:\n> ');
    const parsed: ExecuteFunctionDto = JSON.parse(input) as ExecuteFunctionDto;

    const res = await axios.post('http://localhost:3000/mcp/execute', parsed);

    console.log('\n✅ Response from Lumina:\n', res.data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('\n❌ Invalid input or failed request:\n', message);
  }
}

main().catch((err) => {
  console.error('\n❌ An error occurred:\n', err);
});
