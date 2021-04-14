import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeValidUrl', 'received', '') +
    '\n\n' +
    'Expected value to not be of a valid URL received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeValidUrl', 'received', '') +
    '\n\n' +
    'Expected value to be of a valid URL:\n' +
    `  ${printExpected('a valid URL')}` +
    'Received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeValidUrl: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isValidUrl: obj => {
        return predicate(obj);
    }
};
