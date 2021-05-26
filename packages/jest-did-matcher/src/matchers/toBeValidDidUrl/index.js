import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeValidDidUrl', 'received', '') +
    '\n\n' +
    'Expected value not to be a valid DID URL received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeValidDidUrl', 'received', '') +
    '\n\n' +
    'Expected value to be a valid DID URL, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeValidDidUrl: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isValidDidUrl: string => {
        return predicate(expected);
    }
};
