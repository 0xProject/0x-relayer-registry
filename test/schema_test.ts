import * as chai from 'chai';
import * as dirtyChai from 'dirty-chai';
import { Validator } from 'jsonschema';
import { SchemaValidator } from '@0xproject/json-schemas';
import 'mocha';

import { relayerSchema, relayersSchema } from '../schemas';
import * as relayers from '../../relayers.json';

chai.config.includeStack = true;
chai.use(dirtyChai);
const expect = chai.expect;

const schemaValidator = new SchemaValidator();
schemaValidator.addSchema(relayerSchema);
schemaValidator.addSchema(relayersSchema);
const validateAgainstSchema = (testCases: any[], schema: any, shouldFail = false) => {
    for (const testCase of testCases) {
        const validationResult = schemaValidator.validate(testCase, schema);
        const hasErrors = validationResult.errors.length !== 0;
        if (shouldFail && !hasErrors) {
            throw new Error(`Expected testCase: ${JSON.stringify(testCase, null, '\t')} to fail and it didn't.`);
        } else if (!shouldFail && hasErrors) {
            throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
        }
    }
};
describe('Relayer Schema', () => {
    it('should validate valid Relayers', () => {
        validateAgainstSchema([
            {
                "name"      : "Sample Relayer",
                "url"       : "https://asamplewebsite.com",
                "logo"      : "samplerelayer.png",
                "networks"  : [
                    {
                        "networkId" : 1,
                        "sra_http_endpoint" : "https://api.asamplewebsite.com/",
                        "sra_ws_endpoint" : "ws://api.asamplewebsite.com",
                        "static_order_fields" : {
                            "fee_recipient_addresses": ["0x1111111111111111111111111111111111111111"]
                        }
                    }
                ]
            },
            {
                "name"      : "Sample Relayer",
                "url"       : "https://asamplewebsite.com",
                "logo"      : "samplerelayer.png",
                "networks"  : [
                    {
                        "networkId" : 3
                    },
                    {
                        "networkId" : 1
                    }
                ]
            }
        ], relayerSchema);
    });
    it('should fail invalid Relayers', () => {
        validateAgainstSchema([
            {
                "name"      : "Sample Relayer",
                "url"       : "https://asamplewebsite.com",
                "logo"      : "samplerelayer.png"
            },
            {
                "name"      : "Sample Relayer",
                "url"       : "https://asamplewebsite.com",
                "logo"      : "samplerelayer.png",
                "networks"  : []
            },
            {
                "name"      : "Sample Relayer",
            }
        ], relayerSchema, true);
    });
});
describe('Relayer Registry', () => {
    it('should only contain valid Relayers', () => {
        validateAgainstSchema([relayers], relayersSchema);
    });
});
