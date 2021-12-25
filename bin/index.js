#! /usr/bin/env node

import { program } from 'commander';
import configCreator from '../src/lib/createConfig.js';

program
  .command('bootstrap')
  .description('Bootstrap your project with eslint, prettier, husky, gitignore')
  .alias('bs')
  .action(configCreator);

program.parse(process.argv);
