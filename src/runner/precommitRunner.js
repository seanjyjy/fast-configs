import { Listr } from 'listr2';

import { executeCommand, copyFile, wait } from '../utils/index.js';

const LINT_STAGED_RC_TEMPLATE = '.lintstagedrc.template';
const LINT_STAGED_RC = '.lintstagedrc';

export default function runner(isNPM, c) {
  copyFile(LINT_STAGED_RC_TEMPLATE, LINT_STAGED_RC);

  return new Listr([
    {
      title: 'Installing Husky...',
      task: async (_) => {
        await executeCommand(`${c} husky -D`);
        wait();
      },
    },
    {
      title: 'Initializing Husky scripts...',
      task: async (_) => {
        await executeCommand(`${isNPM ? 'npm' : 'yarn'} husky install`);
        wait();
      },
    },
    {
      title: 'Installing lint-staged...',
      task: async (_) => {
        await executeCommand(`${c} lint-staged -D`);
        wait();
      },
    },
    {
      title: 'Initializing Husky hooks...',
      task: async (_) => {
        await executeCommand(
          `node node_modules/.bin/husky add .husky/pre-commit "npx lint-staged"`
        );
        wait();
      },
    },
  ]);
}
