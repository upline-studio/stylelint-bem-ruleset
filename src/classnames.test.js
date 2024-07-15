// index.test.js
const { messages, ruleName } = require('./classnames')

testRule({
  ruleName,
  config: true,
  fix: false,

  accept: [
    {
      code: '.block {}'
    },
    {
      code: '.bem-block {}'
    },
    {
      code: '.bem-block__bem-element {}'
    },
    {
      code: '.bem-block_bool-modifier {}'
    },
    {
      code: '.bem-block_modifier-name_modifier-value {}'
    },
    {
      code: '.bem-block__bem-element_modifier-name_modifier-value {}'
    },
    {
      code: '.bem-block__bem-element_modifier-name_modifier-value[hidden] {}'
    },
    {
      code: '.bem-block__bem-element_modifier-name_modifier-value[aria-attr="true"] {}'
    },
  ],

  reject: [
    {
      code: '.myClass {}',
      message: messages.wrongClassName,
      line: 1,
      column: 1
    },
    {
      code: '.my-class__test__test {}',
      message: messages.wrongClassName,
      line: 1,
      column: 1
    },
    {
      code: '.my-class--mods {}',
      message: messages.wrongClassName,
      line: 1,
      column: 1
    },
    {
      code: '.my-class-1 {}',
      message: messages.wrongClassName,
      line: 1,
      column: 1
    }
  ]
})

testRule({
  plugins: ['./classname.js'],
  ruleName,
  config: [
    true, {
      word: '[a-z0-9]+'
    }
  ],
  fix: false,

  accept: [
    {
      code: '.block-2 {}'
    },
  ]
})
