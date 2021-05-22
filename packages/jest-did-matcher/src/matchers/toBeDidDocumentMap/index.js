import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import { predicate }  from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeDidDocumentMap', 'received', '') +
    '\n\n' +
    'Expected value to not be a DID document map:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () =>
    matcherHint('.toBeDidDocumentMap', 'received', '') +
    '\n\n' +
    'Expected value to be of a DID document map:\n' +
    `  ${printExpected('A DID document map')}\n` +
    'Received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeDidDocumentMap: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isDidDocumentMap: obj => {
        return predicate(obj);
    }
};
