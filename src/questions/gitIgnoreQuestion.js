const gitIgnoreQuestion = [
  {
    type: 'confirm',
    name: 'gitIgnore',
    message: `gitIgnore - Populate common files that are usually in gitignore:`,
    default: false,
  },
];

export default gitIgnoreQuestion;
