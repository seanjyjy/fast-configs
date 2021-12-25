import { executeCommand } from '../utils/index.js';

export default async function runner(c) {
  await executeCommand(
    `${c} eslint-config-airbnb - D`,
    'npx install-peerdeps --dev eslint-config-airbnb'
  );
}
