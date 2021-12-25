import fs from 'fs';
import path from 'path';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const gitIgnorePath = path.resolve('.gitignore');

const gitIgnoreCommon = [
  ['# dependencies', 'node_modules', '.pnp', '.pnp.js'],
  ['# testing', 'coverage'],
  ['# production', 'build', 'dist'],
  [
    '# misc',
    '.DS_Store',
    '.vscode',
    '.env.local',
    '.env.development.local',
    '.env.test.local',
    '.env.production.local',
  ],
  [
    '# logs',
    'logs',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'lerna-debug.log*',
    '.pnpmdebug.log*',
  ],
];

export default function runner() {
  readFileAsync(gitIgnorePath, { encoding: 'utf8' }, (err, data) => {
    let str = '';
    if (!err) {
      // file exist
      gitIgnoreCommon.forEach((arr) => {
        for (let i = 1; i < arr.length; i++) {
          data = data.replace(`${arr[i]}\n`, '');
        }
      });
      data = data.trim();
      data += '\n';
      str = data;
    }

    gitIgnoreCommon.forEach((arr) => {
      str += `${arr.join('\n')}\n\n`;
    });

    fs.writeFile(gitIgnorePath, str, (err) => {
      if (err) return;
    });
  });
}
