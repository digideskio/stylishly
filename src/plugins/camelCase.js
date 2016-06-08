import hyphenateStyleName from 'hyphenate-style-name';
import transform from 'lodash/transform';

export default function camelCase() {
  function addRuleHook(rule) {
    if (rule.type === 'style') {
      rule.declaration = transform(
        rule.declaration,
        (result, val, key) => {
          result[hyphenateStyleName(key)] = val;
        },
        {}
      );
    }
  }

  return { addRuleHook };
}