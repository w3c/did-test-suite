import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = received => () =>
    matcherHint('.not.toBeInfraString', 'received', '') +
    '\n\n' +
    'Expected value to not be of type INFRA string received:\n' +
    `  ${printReceived(received)}`;

const failMessage = received => () => 
    matcherHint('.toBeInfraString', 'received', '') +
    '\n\n' +
    'Expected value to be of type INFRA string, but received:\n' +
    `  ${printReceived(received)}`;

export default {
    toBeInfraString: expected => {
        const pass = predicate(expected);
        if (pass) {
            return { pass: true, message: passMessage(expected) };
        }

        return { pass: false, message: failMessage(expected) };
    },

    isInfraString: obj => {
        return predicate(obj);
    }
};
