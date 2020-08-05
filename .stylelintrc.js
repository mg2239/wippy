module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-blockless', 'first-nested'],
      },
    ],
    'at-rule-no-unknown': null,
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'font-family-no-missing-generic-family-keyword': null,
    'max-empty-lines': 1,
    'max-line-length': 80,
    'order/order': [
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'extend',
      },
      'declarations',
      'rules',
      'at-rules',
    ],
    'order/properties-alphabetical-order': true,
    'rule-empty-line-before': 'always',
  },
};
