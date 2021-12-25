import inquierer from 'inquirer';
import chalk from 'chalk';

import {
  eslintOptionQuestion,
  prettierConfigsQuestion,
  precommitHookQuestion,
  gitIgnoreQuestion,
  confirmQuestion,
  downloaderQuestion,
} from '../questions/index.js';
import generateConfig from './config.js';

const { prompt } = inquierer;

const ignoreConfigs = [
  '> rangeStart',
  '> rangeEnd',
  '> parser',
  '> filePath',
  '> requirePragma',
  '> insertPragma',
  '> proseWrap',
  '> htmlWhitespaceSensitivty',
  '> vueIndentScriptAndStyle',
  '> endOfLine',
  '> embeddedLanguageFormatting',
];

const WARNING = '#D05461';
const DARKRED = '#de3e70';
const ORANGE = '#D96E00';
const YELLOW = '#DDD40D';
const GREEN = '#63C975';
const BLUE = '#1D96BA';
const PURPLE = '#834eed';
const HOTPINK = '#D24177';
const _S = chalk.hex(DARKRED)('S');
const _U = chalk.hex(ORANGE)('U');
const _C1 = chalk.hex(YELLOW)('C');
const _C2 = chalk.hex(GREEN)('C');
const _E = chalk.hex(BLUE)('E');
const _S1 = chalk.hex(PURPLE)('S');
const _S2 = chalk.hex(HOTPINK)('S');

const ignoreConfigsStrings = ignoreConfigs.join('\n');

async function init() {
  const eslintResult = await prompt(eslintOptionQuestion);

  let prettierResult;
  if (eslintResult.prettier) {
    console.log(
      chalk.hex(WARNING)(
        `Note that the follow configs will be left as default properties in prettier configs:`
      )
    );
    console.log(ignoreConfigsStrings);
    prettierResult = await prompt(prettierConfigsQuestion);
  }

  const { precommitHook } = await prompt(precommitHookQuestion);

  const { gitIgnore } = await prompt(gitIgnoreQuestion);

  const { confirm } = await prompt(confirmQuestion);

  if (!confirm) {
    return init();
  }

  const { downloader } = await prompt(downloaderQuestion);

  await generateConfig(eslintResult, prettierResult, precommitHook, gitIgnore, downloader);

  console.log(
    `🎉🎉🎉 ${_S}${_U}${_C1}${_C2}${_E}${_S1}${_S2} All the relevant configs and dependencies have been succesfully setup 🎉🎉🎉`
  );
  console.log(
    `${chalk
      .hex('#4AAA44')
      .bold(
        'Do commmit the precommit hook file first'
      )} and then the others to ensure that husky works perfectly fine~`
  );
}

export default function () {
  init();
}
