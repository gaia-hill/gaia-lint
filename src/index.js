import { ESLint } from 'eslint';
import watch from 'node-watch';
import config, { customConfig, lintPath } from './default';
import { DEFAULT_FORMATTER } from './const';

const lint = new ESLint(config);
const lintFix = new ESLint({ ...config, fix: true });
const glint = async (evt, name) => {
  if (evt !== 'update') return;
  if (customConfig.fix && name) {
    const currentFileFix = await lintFix.lintFiles(name);
    await ESLint.outputFixes(currentFileFix);
  }
  const results = await lint.lintFiles(lintPath);
  const formatter = await lint.loadFormatter(customConfig.formatter || DEFAULT_FORMATTER);
  const outputResult = formatter.format(results);
  if (outputResult) {
    console.log(formatter.format(results));
  } else {
    console.log('\n\x1B[32m √ eslint problems clear \x1B[0m\n');
  }
};

watch(lintPath, {
  recursive: true,
  filter: (file) => {
    const ext = file.split('.').pop();
    return !/node_modules/.test(file) && config.extensions.includes(`.${ext}`);
  },
}, glint);
glint('update');
