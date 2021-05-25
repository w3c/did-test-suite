import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeMediaType', 'received', '') +
    '\n\n' +
    'Expected value to not be of a valid Media Type received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeMediaType', 'received', '') +
    '\n\n' +
    'Expected value to be of a valid Media Type, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeMediaType: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isMediaType: obj => {
        return predicate(obj);
    }
};
