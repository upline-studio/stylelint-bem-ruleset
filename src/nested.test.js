// index.test.js
import {messages, ruleName} from "./nested";


testRule({
  ruleName,
  config: true,
  fix: false,

  accept: [
    {
      code:
`.block {
  &__elm {}
}`,
      description: 'BEM-element',
    },
    {
      code:
`.block {
  &[attr-name] {}
}`,
      description: 'attr mix',
    },
    {
      code:
`.block {
  &:hover {}
}`,
      description: 'nested pseudo-class',
    },
    {
      code:
        `.block {
  &.active {}
}`,
      description: 'class mix',
    },
    {
      code:
        `.block {
  .active {}
}`,
      description: 'nested class',
    },
    {
      code:
`.block {
  &_mod {
    &_mod-value {}
  }
}`,
      description: 'BEM-modifier',
    },
    {
      code:
`.block {
  &__elm {
    &_mod {
      &_mod-value {}
    }
  }
}`,
      description: 'BEM element modifier',
    },
  ],

  reject: [
    {
      code:
        `.block {
  &-test {}
}`,
      description: 'no name nesting',
      message: messages.wrongNesting,
      line: 2,
      column: 3,
    },
    {
      code:
        `.block {
  &__elem {
  &-test {}
  }
}`,
      description: 'no element name nesting',
      message: messages.wrongNesting,
      line: 3,
      column: 3
    },
    {
      code:
        `.block {
  &__elm_mod {}
}`,
      description: 'separate modification from element',
      message: messages.wrongNesting,
      line: 2,
      column: 3
    },
    {
      code:
        `.block {
  &_mod_val {}
}`,
      description: 'separate modification name and value',
      message: messages.wrongNesting,
      line: 2,
      column: 3
    }
  ]
})
