import { Listr } from 'listr2';
import {
  eslintRunner,
  tsRunner,
  airbnbRunner,
  prettierRunner,
  precommitRunner,
  gitignoreRunner,
} from '../runner/index.js';

async function generateConfig(
  eslintResult,
  prettierResult = {},
  precommitHook,
  gitIgnore,
  downloader
) {
  const isUsingImport = eslintResult.sourceType;
  const isTS = eslintResult.language === 'TypeScript';
  const isUsingPrettier = eslintResult.prettier;
  const isUsingDefault = eslintResult.eslintType === 1;
  const isNPM = downloader === 'npm';
  const c = isNPM ? 'npm i' : 'yarn add';

  const listrOptions = {
    ts: false,
    airbnb: false,
    prettier: false,
    precommitHook: false,
    gitIgnore: false,
    rendererOptions: { indentation: 4, collapse: false },
  };

  const runner = new Listr(
    [
      {
        title: 'Installing eslint dependencies and configs...',
        task: async (ctx) =>
          eslintRunner(
            isTS,
            isUsingImport,
            isUsingDefault,
            isUsingPrettier,
            precommitHook,
            gitIgnore,
            c,
            ctx
          ),
      },
      {
        title: 'Installing TypeScript configs...',
        task: async (_) => tsRunner(c),
        enabled: (ctx) => ctx.ts,
      },
      {
        title: 'Installing AirBnb configs...',
        task: async (_) => airbnbRunner(c),
        enabled: (ctx) => ctx.airbnb,
      },
      {
        title: 'Installing Prettier dependencies and configs...',
        task: async (_) => prettierRunner(prettierResult, c),
      },
      {
        title: 'Installing precommit hooks and configs...',
        task: (_) => precommitRunner(isNPM, c),
        enabled: (ctx) => ctx.precommitHook,
      },
      {
        title: 'Writing into gitignore...',
        task: async (_) => gitignoreRunner(),
        enabled: (ctx) => ctx.gitIgnore,
      },
    ],
    listrOptions
  );

  await runner.run();
}

export default generateConfig;
