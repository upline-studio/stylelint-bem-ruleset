const stylelint = require('stylelint')
const { isStringOrRegex } = require('./utils')

const ruleName = 'stylelint-bem-ruleset/classnames'

const defaultPreset = {
  word: '[a-z]+',
  wordSeparator: '-',
}

function createBemClassNameRegex (preset) {
  const word = preset?.word || defaultPreset.word
  const wordSeparator = preset?.wordSeparator || defaultPreset.wordSeparator

  const entityName = `${word}(?:${wordSeparator}${word})*`
  return `^${entityName}(?:__${entityName})?(?:_${entityName}){0,2}$`
}

const messages = stylelint.utils.ruleMessages(ruleName, {
  wrongClassName: 'Class name doesn\'t follow BEM conventions'
})

const namingRulesLink = 'https://en.bem.info/methodology/naming-convention/#naming-rules'

const meta = {
  url: namingRulesLink
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
          ruleName: 'selector-class-pattern',
          ruleSettings: [
            createBemClassNameRegex(secondaryOptionObject),
            {
              resolveNestedSelectors: true
            }
          ],
          root: postcssRoot
        },
        (warning) => {
          stylelint.utils.report({
            message: messages.wrongClassName,
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
