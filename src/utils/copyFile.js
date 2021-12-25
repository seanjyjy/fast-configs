import fs from 'fs';
import path from 'path';

import { rootDir, cwd } from './constants.js';

function copyFile(eslint, filePath, fn) {
  fs.copyFile(path.join(rootDir, eslint), path.join(cwd, filePath), (err) => {
    if (err) return;
    if (fn) fn();
  });
}

export default copyFile;
