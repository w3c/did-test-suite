import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeInfraMap', 'received', '') +
    '\n\n' +
    'Expected value to not be of type IFRA map received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeInfraMap', 'received', '') +
    '\n\n' +
    'Expected value to be of type INFRA map, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeInfraMap: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isInfraMap: obj => {
        return predicate(obj);
    }
};
