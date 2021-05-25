import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeValidUri', 'received', '') +
    '\n\n' +
    'Expected value to not be of a valid Uri received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeValidUri', 'received', '') +
    '\n\n' +
    'Expected value to be of a valid URI, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeValidUri: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isValidUri: obj => {
        return predicate(obj);
    }
};
