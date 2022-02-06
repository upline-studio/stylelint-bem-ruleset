# BEM ruleset  for stylelint

## Install

Run
```bash
npm i stylelint-bem-ruleset
```
Add to `.stylelintrc.js`
```js
module.exports = {
  extends: [
    '@up-line/stylelint-bem-ruleset'
  ]
}
```


## Rules

### Classnames

Validate classnames according to [classic BEM](https://en.bem.info/methodology/naming-convention/#naming-rules)
```json
{
  "stylelint-bem-ruleset/classnames": true
}
```

### Nested
Validate scss nesting, [read more](https://github.com/upline-studio/stylelint-bem-ruleset/docs/nested.md)

```json
{
  "stylelint-bem-ruleset/nested": true
}
```
