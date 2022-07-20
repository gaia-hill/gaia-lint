import { ESLint } from 'eslint';
import config, { customConfig, lintPath } from './default';
import { DEFAULT_FORMATTER } from './const';

async function fix() {
  const lint = new ESLint({ ...config, fix: true });
  const results = await lint.lintFiles(lintPath);
  await ESLint.outputFixes(results);
  const formatter = await lint.loadFormatter(customConfig.formatter || DEFAULT_FORMATTER);
  const resultText = formatter.format(results);
  console.log(resultText);
}
fix();
