

封装了eslint工具，适用于nodejs、browser环境


#### 安装

`npm i gaia-lint --save-dev`

#### 命令

glint

glintfix

#### glint.config.js配置

配置文件放到项目package.json同级目录

```javascript

module.exports = {
  fix: false,                   // 是否自动修复
  path: [],                     // 检测eslint的路径
  ts: false,                    // 是否是ts项目
  formatter: 'stylish',         // 结果输出的风格
  extensions: ['.js', '.ts'],   // 匹配的文件后缀
  config: {},                   // eslint配置，会合并到默认配置，如果存在eslintrc文件,则eslintrc也会合并到配置中，参考官方文档https://cn.eslint.org/docs/developer-guide/nodejs-api#cliengine
};

```
