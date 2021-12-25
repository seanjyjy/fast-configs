import chalk from 'chalk';

const defaultValue = chalk.green.bold('default');
const blank = chalk.hex('#c4c2c3').bold('(Leave blank for default)');

// quoteProps
const ASNEEDED = 'as-needed';
const ASNEEDEDFAULT = `${ASNEEDED} (${defaultValue})`;
const CONSISTENT = 'consistent';
const PRESERVE = 'preserve';

// jsxQuotes
const ES5 = 'es5';
const ES5DEFAULT = `${ES5} (${defaultValue})`;
const NONE = 'none';
const ALL = 'all';

// arrowParams
const ALWAYS = 'always';
const ALWAYSDEFAULT = `${ALWAYS} (${defaultValue})`;
const AVOID = 'avoid';

const prettierConfigsQuestion = [
  {
    type: 'input',
    name: 'printWidth',
    message: `printWidth - Specify the line length that the printer will wrap on ${blank}:`,
    filter(val = '') {
      return val.trim();
    },
    validate(input) {
      return input === '' || isInt(input);
    },
  },
  {
    type: 'input',
    name: 'tabWidth',
    message: `tabWidth - Specify the number of spaces per indentation-level ${blank}: `,
    filter(val = '') {
      return val.trim();
    },
  },
  {
    type: 'confirm',
    name: 'useTabs',
    message: `useTabs - Indent lines with tabs instead of spaces ${blank}: `,
    default: false,
  },
  {
    type: 'confirm',
    name: 'semi',
    message: `semi - Print semicolons at the ends of statements ${blank}: `,
    default: false,
  },
  {
    type: 'confirm',
    name: 'singleQuote',
    message: `singleQuote - Use single quotes instead of double quotes ${blank}: `,
    default: false,
  },
  {
    type: 'list',
    name: 'quoteProps',
    message: 'quoteProps - Change when properties in objects are quoted',
    choices: [ASNEEDEDFAULT, CONSISTENT, PRESERVE],
    filter(key) {
      if (key === ASNEEDEDFAULT) {
        return ASNEEDED;
      }
      return key;
    },
  },
  {
    type: 'confirm',
    name: 'jsxSingleQuote',
    message: 'jsxSingleQuote - Use single quotes instead of double quotes in JSX',
    default: false,
  },
  {
    type: 'list',
    name: 'trailingComma',
    message:
      'trailingComma - Print trailing commas wherever possible in multi-line comma-separated syntactic structures. (A single-line array, for example, never gets trailing commas.)',
    choices: [ES5DEFAULT, NONE, ALL],
    filter(key) {
      if (key === ES5DEFAULT) {
        return ES5;
      }
      return key;
    },
  },
  {
    type: 'confirm',
    name: 'bracketSpacing',
    message: `bracketSpacing - Print spaces between brackets in object literals ${blank}: `,
    default: true,
  },
  {
    type: 'confirm',
    name: 'bracketSameLine',
    message: `bracketSameLine - Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements) ${blank}: `,
    default: false,
  },
  {
    type: 'list',
    name: 'arrowParens',
    message: 'arrowParens - Use single quotes instead of double quotes in JSX',
    choices: [ALWAYSDEFAULT, AVOID],
    filter(key) {
      if (key === ALWAYSDEFAULT) return ALWAYS;
      return key;
    },
  },
];

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

export default prettierConfigsQuestion;
