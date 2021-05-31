import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeValidDid', 'received', '') +
    '\n\n' +
    'Expected value to not be of valid DID received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeValidDid', 'received', '') +
    '\n\n' +
    'Expected value to be of valid DID, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeValidDid: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isValidDid: string => {
        return predicate(expected);
    }
};
