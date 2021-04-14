import matchers from './matchers';

const jestExpect = global.expect;

if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  /* eslint-disable no-console */
  console.error(
    "Unable to find Jest's global expect." +
      '\nPlease check you have added jest-did-matcher correctly to your jest configuration.'
  );
  /* eslint-enable no-console */
}
