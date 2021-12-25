import fs from 'fs';
import { executeCommand, copyFile } from '../utils/index.js';

const PRETTIER_IGNORE_TEMPLATE = '.prettierignore.template';
const PRETTIER_IGNORE = '.prettierignore';

export default async function runner(prettierResult, c) {
  // write into prettierignore
  copyFile(PRETTIER_IGNORE_TEMPLATE, PRETTIER_IGNORE);

  // format the prettierrc
  if (prettierResult.printWidth === '') {
    delete prettierResult.printWidth;
  } else {
    prettierResult.printWidth = parseInt(prettierResult.printWidth);
  }

  if (prettierResult.tabWidth === '') {
    delete prettierResult.tabWidth;
  } else {
    prettierResult.tabWidth = parseInt(prettierResult.tabWidth);
  }

  // write into prettierrc
  fs.writeFile('.prettierrc', JSON.stringify(prettierResult, null, 2), (err) => {
    if (err) return;
  });

  // install prettier as well as config to avoid conflict with eslint
  await executeCommand(`${c} prettier eslint-config-prettier eslint-plugin-prettier -D`);
}
