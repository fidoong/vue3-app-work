// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    pnpm: true,
  },
  {
    // 排除 Markdown 文件中的代码块检查
    ignores: [
      '**/md/**/*.md',
      '**/*.md',
    ],
  },
  {
    // Vue 组件格式化规则
    files: ['**/*.vue'],
    rules: {
      // 组件属性每行一个
      'vue/max-attributes-per-line': ['error', {
        singleline: 1, // 单行模式下每行最多 1 个属性
        multiline: 1, // 多行模式下每行最多 1 个属性
      }],
      // 第一个属性的位置
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside', // 单个属性时在同一行
        multiline: 'below', // 多个属性时第一个属性换行
      }],
      // HTML 闭合括号换行
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      // HTML 缩进
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
      }],
    },
  },
)
