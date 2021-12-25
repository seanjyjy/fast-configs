import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);

const cwd = path.resolve();
const rootDir = path.resolve(__filename, '../../formats');

export { cwd, rootDir };
