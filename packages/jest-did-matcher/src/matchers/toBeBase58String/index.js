import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeBase58String', 'received', '') +
    '\n\n' +
    'Expected value to not be of a Base58 string received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeBase58String', 'received', '') +
    '\n\n' +
    'Expected value to be of a Base58 string, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeBase58String: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isBase58String: obj => {
        return predicate(obj);
    }
};
