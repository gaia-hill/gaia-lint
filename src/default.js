import { DEFAULT_INCLUDES_EXT, ROOT_PATH, DEFAULT_EXCLUDES_DIRS } from './const';
import fs from 'fs';
import path from 'path';

const defaultConfig = {
  baseConfig: {
    env: { browser: true, node: true, es6: true, es2017: true, es2020: true, es2021: true, jest: true },
    parser: '@babel/eslint-parser',
    parserOptions: {
      sourceType: 'module',
    },
    extends: [],
    plugins: [],
    ignorePatterns: DEFAULT_EXCLUDES_DIRS,
    rules: {},
  },
  overrideConfig: {},
  cwd: ROOT_PATH,
  extensions: DEFAULT_INCLUDES_EXT,
  cache: false,
  reportUnusedDisableDirectives: 'warn',
  fix: false,
  fixTypes: ['problem', 'suggestion', 'layout'],
};

const configPath = path.join(ROOT_PATH, './glint.config.js');
const getCustomConfig = () => {
  if (fs.existsSync(configPath)) {
    try {
      const glintConfig = require(configPath);
      if (glintConfig.config instanceof Function) {
        glintConfig.config = glintConfig.lintConfig(defaultConfig.baseConfig);
      }
      if (glintConfig.ts) {
        defaultConfig.baseConfig.parser = '@typescript-eslint/parser';
      }

      // 如果自定义了后缀，使用用户定义的文件后缀
      if (glintConfig.extensions) {
        defaultConfig.extensions = glintConfig.extensions;
      }
      return glintConfig;
    } catch (error) {
      throw Error('tlint.config.json配置出错');
    }
  }
  return {};
};

// 获取需要eslint的目录
const getLintPath = () => {
  if (customConfig.path) {
    if (typeof (customConfig.path) === 'string') {
      return [path.join(ROOT_PATH, customConfig.path)];
    } if (customConfig.path instanceof Array) {
      return customConfig.path.map(filepath => path.join(ROOT_PATH, filepath));
    }
  }
  return [ROOT_PATH];
};
export const customConfig = getCustomConfig();
export const lintPath = getLintPath();
defaultConfig.overrideConfig = customConfig.config;
export default defaultConfig;
