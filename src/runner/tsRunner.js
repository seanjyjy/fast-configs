import { executeCommand } from '../utils/index.js';

export default async function runner(c) {
  await executeCommand(
    `${c} @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript -D`
  );
}
