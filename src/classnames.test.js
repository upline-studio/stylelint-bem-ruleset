// index.test.js
import {messages, ruleName} from "./classnames";


testRule({
  ruleName,
  config: true,
  fix: false,

  accept: [
    {
      code: '.block {}',
      description: 'simple class'
    },
    {
      code: '.bem-block {}',
      description: 'two words'
    },
    {
      code: '.bem-block__bem-element {}',
      description: 'bem element'
    },
    {
      code: '.bem-block_bool-modifier {}',
      description: 'bem bool modifier'
    },
    {
      code: '.bem-block_modifier-name_modifier-value {}',
      description: 'bem modifier'
    },
    {
      code: '.bem-block__bem-element_modifier-name_modifier-value {}',
      description: 'bem element modifier'
    },
    {
      code: '.bem-block__bem-element_modifier-name_modifier-value[hidden] {}',
      description: 'bem element modifier with attribute'
    },
    {
      code: '.bem-block__bem-element_modifier-name_modifier-value[aria-attr="true"] {}',
      description: 'bem element modifier with attribute with value'
    },
  ],

  reject: [
    {
      code: '.myClass {}',
      message: messages.wrongClassName,
      description: 'wrong case',
      line: 1,
      column: 1
    },
    {
      code: '.my-class__test__test {}',
      message: messages.wrongClassName,
      description: 'deep element',
      line: 1,
      column: 1
    },
    {
      code: '.my-class--mods {}',
      description: 'dash-dash modifier',
      message: messages.wrongClassName,
      line: 1,
      column: 1
    },
    {
      code: '.my-class-1 {}',
      description: 'numbers in class',
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
