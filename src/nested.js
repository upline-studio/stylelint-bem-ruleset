const stylelint = require('stylelint')
const { isStringOrRegex } = require('./utils')

const ruleName = 'stylelint-bem-ruleset/nested'

const defaultPreset = {
  word: '[a-z]+',
  wordSeparator: '\-',
}

function createNestedRegex (preset) {
  const word = preset?.word || defaultPreset.word
  const wordSeparator = preset?.wordSeparator || defaultPreset.wordSeparator

  const entityName = `${word}(?:${wordSeparator}${word})*`

  const doesntHaveAmp = '([^\\&]+)'

  const newSelectorStart = '\\&[.:[][^\\&]*'

  const possibleBemNested = `\\&_{1,2}${entityName}`

  const allowedNestedPatterns = [doesntHaveAmp, newSelectorStart, possibleBemNested].map(s => `(?:${s})`)
  return `^${allowedNestedPatterns.join('|')}$`
}

const messages = stylelint.utils.ruleMessages(ruleName, {
  wrongNesting: 'Nested selector doesn\'t follow the rules'
})

const rulesLink = 'https://github.com/upline-studio/stylelint-bem-ruleset/docs/nested.md'

const meta = {
  url: rulesLink
}

const optionsSchema = {
  word: [
    isStringOrRegex
  ]
}

module.exports = stylelint.createPlugin(
  ruleName,
  function (_, secondaryOptionObject) {
    return function (postcssRoot, postcssResult) {
      if(secondaryOptionObject) {
        const validOptions = stylelint.utils.validateOptions(
          postcssResult,
          ruleName,
          {
            actual: secondaryOptionObject,
            possible: optionsSchema
          }
        )

        if (!validOptions) {
          throw new Error('Invalid options passed')
        }
      }

      stylelint.utils.checkAgainstRule(
        {
          ruleName: 'selector-nested-pattern',
          ruleSettings: createNestedRegex(secondaryOptionObject),
          root: postcssRoot
        },
        (warning) => {
          stylelint.utils.report({
            message: messages.wrongNesting,
            ruleName: ruleName,
            result: postcssResult,
            node: warning.node,
            line: warning.line,
            column: warning.column
          })
        }
      )
    }
  }
)

module.exports.ruleName = ruleName
module.exports.messages = messages
module.exports.meta = meta
