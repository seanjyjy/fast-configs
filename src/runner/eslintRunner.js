import path from 'path';
import fs from 'fs';

import { executeCommand, copyFile } from '../utils/index.js';

const ESLINT_IGNORE_TEMPLATE = '.eslintignore.template';
const ESLINTRC = '.eslintrc';
const ESLINT_IGNORE = '.eslintignore';

const parserOptions = `,
\x20\x20"parserOptions": {
\x20\x20\x20\x20"sourceType": "module",
\x20\x20\x20\x20"ecmaVersion": 2020
\x20\x20}`;

function addParserOptions() {
  const eslintPath = path.resolve('.eslintrc');
  fs.readFile(eslintPath, { encoding: 'utf-8' }, (_err, data) => {
    let idx = data.lastIndexOf('\n}');
    data = data.substring(0, idx) + parserOptions + data.substring(idx);
    fs.writeFile(eslintPath, data, (_err) => {});
  });
}

export default async function runner(
  isTS,
  isUsingImport,
  isUsingDefault,
  isUsingPrettier,
  precommitHook,
  gitIgnore,
  c,
  ctx
) {
  await executeCommand(`${c} eslint -D`);

  if (isTS) {
    ctx.ts = true;
  }
  if (!isUsingDefault) {
    ctx.airbnb = true;
  }
  if (isUsingPrettier) {
    ctx.prettier = true;
  }
  if (precommitHook) {
    ctx.precommitHook = true;
  }

  if (gitIgnore) {
    ctx.gitIgnore = true;
  }

  copyFile(
    `.eslintrc.${isTS ? 'ts' : 'js'}.${isUsingDefault ? 'default' : 'airbnb'}.${
      isUsingPrettier ? 'prettier.' : ''
    }template`,
    ESLINTRC,
    isUsingImport && addParserOptions
  );

  copyFile(ESLINT_IGNORE_TEMPLATE, ESLINT_IGNORE);
}
