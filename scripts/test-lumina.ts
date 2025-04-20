import axios from 'axios';
import * as readline from 'readline';
import * as kleur from 'kleur';
import { readFile } from 'fs/promises';

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
  const jsonArgIndex = process.argv.indexOf('--json');
  const fileArgIndex = process.argv.indexOf('--file');

  let input: string;

  if (jsonArgIndex !== -1 && process.argv[jsonArgIndex + 1]) {
    input = process.argv[jsonArgIndex + 1];
  } else if (fileArgIndex !== -1 && process.argv[fileArgIndex + 1]) {
    const filePath = process.argv[fileArgIndex + 1];
    try {
      const fileContents = await readFile(filePath, 'utf-8');
      input = fileContents;
    } catch (err) {
      console.error(kleur.red(`\n❌ Failed to read file: ${filePath}`));
      if (err instanceof Error) {
        console.error(kleur.yellow(err.message));
      }
      process.exit(1);
    }
  } else {
    const prompt = kleur.cyan('💬 Paste your JSON request for Lumina:\n> ');
    input = await ask(prompt);
  }

  try {
    const parsed: ExecuteFunctionDto = JSON.parse(input) as ExecuteFunctionDto;
    const res = await axios.post('http://localhost:3000/mcp/execute', parsed);
    console.log(kleur.green('\n✅ Response from Lumina:\n'));
    console.dir(res.data, { depth: null, colors: true });
  } catch (err: unknown) {
    console.error(kleur.red('\n❌ Invalid input or failed request:\n'));

    if (err instanceof Error) {
      console.error(kleur.yellow(err.message));
    }
    if (axios.isAxiosError(err) && err.response) {
      console.error(kleur.magenta('🔎 Axios response data:'));
      console.dir(err.response.data, { depth: null, colors: true });
    }
    console.error(kleur.gray('\n📦 Raw error object:'));
    console.dir(err, { depth: null });
  }
}

main().catch((err) => {
  console.error(kleur.red('\n❌ An error occurred:\n'), err);
});
