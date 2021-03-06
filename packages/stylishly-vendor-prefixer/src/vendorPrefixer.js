import Prefixer from 'inline-style-prefixer';
import canUseDOM from 'stylishly-utils/lib/canUseDOM';

export default function vendorPrefixer({
  prefixer = new Prefixer({
    userAgent: canUseDOM ? undefined : 'all'
  })
} = {}) {
  function transformDeclarationHook(key, value, rule) {
    rule.declaration = prefixer.prefix(rule.declaration);
  }

  return { transformDeclarationHook };
}
