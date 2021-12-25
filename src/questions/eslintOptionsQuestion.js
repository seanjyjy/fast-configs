import chalk from 'chalk';

const recommended = chalk.green.bold('recommended');
const ESLINTAIRBNB = 'ESLint + Airbnb config';
const ESLINTBASIC = 'ESLint only';

const eslintMapping = {
  [ESLINTBASIC]: 1,
  [ESLINTAIRBNB]: 2,
};

const eslintOptionQuestion = [
  {
    type: 'list',
    name: 'eslintType',
    message: 'Choose your eslint config settings:',
    choices: Object.keys(eslintMapping),
    filter(key) {
      return eslintMapping[key];
    },
  },
  {
    type: 'list',
    name: 'language',
    message: 'Is this project using TypeScript or JavaScript:',
    choices: ['JavaScript', 'TypeScript'],
  },
  {
    type: 'confirm',
    name: 'sourceType',
    message: 'Is this project using ES6+ modules? (i.e Using import syntax?):',
    default: true,
  },
  {
    type: 'confirm',
    name: 'prettier',
    message: `Do you want to include prettier as well (${recommended})?`,
    default: true,
  },
];

export default eslintOptionQuestion;
