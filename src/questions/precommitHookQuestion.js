const precommitHookQuestion = [
  {
    type: 'confirm',
    name: 'precommitHook',
    message: `precommitHook - A hook that helps to checks for linting errors before committing:`,
    default: false,
  },
];

export default precommitHookQuestion;
