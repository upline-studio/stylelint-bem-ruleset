// index.test.js
const { messages, ruleName } = require('./nested')

testRule({
  ruleName,
  config: true,
  fix: false,

  accept: [
    {
      code:
`.block {
  &__elm {}
}`
    },
    {
      code:
`.block {
  &[attr-name] {}
}`
    },
    {
      code:
`.block {
  &:hover {}
}`
    },
    {
      code:
        `.block {
  &.active {}
}`
    },
    {
      code:
        `.block {
  .active {}
}`
    },
    {
      code:
`.block {
  &_mod {
    &_mod-value {}
  }
}`
    },
    {
      code:
`.block {
  &__elm {
    &_mod {
      &_mod-value {}
    }
  }
}`
    },
  ],

  reject: [
    {
      code:
        `.block {
  &-test {}
}`,
      message: messages.wrongNesting,
      line: 2,
      column: 3
    },
    {
      code:
        `.block {
  &__elem {
  &-test {}
  }
}`,
      message: messages.wrongNesting,
      line: 3,
      column: 3
    },
    {
      code:
        `.block {
  &__elm_mod {}
}`,
      message: messages.wrongNesting,
      line: 2,
      column: 3
    },
    {
      code:
        `.block {
  &_mod_val {}
}`,
      message: messages.wrongNesting,
      line: 2,
      column: 3
    }
  ]
})
