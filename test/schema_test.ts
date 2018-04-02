import * as chai from 'chai';
import * as dirtyChai from 'dirty-chai';
import { Validator } from 'jsonschema';
import 'mocha';

import { addressSchema, relayerSchema, relayersSchema } from '../schemas';
import * as relayers from '../../relayers.json';

chai.config.includeStack = true;
chai.use(dirtyChai);
const expect = chai.expect;

const validator = new Validator();
const validateAgainstSchema = (testCases: any[], schema: any, shouldFail = false) => {
    for(const testCase of testCases) {
        const validationResult = validator.validate(testCase, schema);
        const hasErrors = validationResult.errors.length !== 0;
        if (shouldFail) {
            if (!hasErrors) {
                throw new Error(
                    `Expected testCase: ${JSON.stringify(testCase, null, '\t')} to fail and it didn't.`,
                );
            }
        } else {
            if (hasErrors) {
                throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
            }
        }
    }
};
describe('Relayers', () => {
    describe('#relayersRegistry', () => {
        it('should only contain valid Relayers', () => {
            validateAgainstSchema([relayers], relayersSchema);            
        });
    });
}); // tslint:disable:max-file-line-count