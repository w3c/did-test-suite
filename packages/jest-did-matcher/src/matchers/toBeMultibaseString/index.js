import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeMultibaseString', 'received', '') +
    '\n\n' +
    'Expected value to not be a Multibase string received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () =>
    matcherHint('.toBeMultibaseString', 'received', '') +
    '\n\n' +
    'Expected value to be a Multibase string, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeMultibaseString: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isMultibaseString: obj => {
        return predicate(obj);
    }
};
