import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeDidDocumentPropertyValueType', 'received', '') +
    '\n\n' +
    'Expected value to not be of type IFRA map received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () =>
    matcherHint('.toBeDidDocumentPropertyValueType', 'received', '') +
    '\n\n' +
    'Expected value to be of type allowed in DID Document, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeDidDocumentPropertyValueType: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isDidDocumentPropertyValueType: obj => {
        return predicate(obj);
    }
};
