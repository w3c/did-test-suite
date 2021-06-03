import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeDidCoreDatetime', 'received', '') +
    '\n\n' +
    'Expected value to not be of a valid DID Core Datetime received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeDidCoreDatetime', 'received', '') +
    '\n\n' +
    'Expected value to be of a valid DID Core Datetime, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeDidCoreDatetime: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isDidCoreDatetime: obj => {
        return predicate(obj);
    }
};
