import * as chai from 'chai';
import * as _ from 'lodash';
import * as isValidUUID from 'uuid-validate';
import * as dirtyChai from 'dirty-chai';
import { SchemaValidator } from '@0xproject/json-schemas';
import 'mocha';

import { relayerSchema, relayersSchema } from '../schemas';
import * as relayers from '../../relayers.json';

chai.config.includeStack = true;
chai.use(dirtyChai);

const schemaValidator = new SchemaValidator();
schemaValidator.addSchema(relayerSchema);
schemaValidator.addSchema(relayersSchema);
const validateAgainstSchema = (relayers: { [uuid: string]: any }, schema: any, shouldFail = false) => {
    _.each(relayers, (relayer, uuid) => {
        if (!isValidUUID(uuid)) {
            throw new Error('Make sure your UUID was generated using the `npm run generate:uuid` command');
        }
        const validationResult = schemaValidator.validate(relayer, schema);
        const hasErrors = validationResult.errors.length !== 0;
        if (shouldFail && !hasErrors) {
            throw new Error(`Expected testCase: ${JSON.stringify(relayer, null, '\t')} to fail and it didn't.`);
        } else if (!shouldFail && hasErrors) {
            throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
        }
    });
};
describe('Relayer Schema', () => {
    it('should validate valid Relayers', () => {
        validateAgainstSchema(
            {
                '56b7d109-6982-472e-b272-501d4d690c71': {
                    name: 'Sample Relayer',
                    homepage_url: 'https://asamplewebsite.com',
                    logo: 'samplerelayer.png',
                    networks: [
                        {
                            networkId: 1,
                            sra_http_endpoint: 'https://api.asamplewebsite.com/',
                            sra_ws_endpoint: 'ws://api.asamplewebsite.com',
                            static_order_fields: {
                                fee_recipient_addresses: ['0x1111111111111111111111111111111111111111'],
                            },
                        },
                    ],
                },
                'a1d617d7-465c-44c9-9908-4de6aabc8dd3': {
                    name: 'Sample Relayer',
                    homepage_url: 'https://asamplewebsite.com',
                    logo: 'samplerelayer.png',
                    networks: [
                        {
                            networkId: 3,
                        },
                        {
                            networkId: 1,
                        },
                    ],
                },
            },
            relayerSchema,
        );
    });
    it('should fail invalid Relayers', () => {
        validateAgainstSchema(
            {
                '0964ed09-81c3-446a-bf47-6b3e1ff551cc': {
                    name: 'Sample Relayer',
                    url: 'https://asamplewebsite.com',
                    logo: 'samplerelayer.png',
                },
                'dd2d1b3f-e7a3-4751-8c7e-7274f1c5038f': {
                    name: 'Sample Relayer',
                    url: 'https://asamplewebsite.com',
                    logo: 'samplerelayer.png',
                    networks: [],
                },
                'f65ab054-8b33-4f22-a94c-55e5f8768b57': {
                    name: 'Sample Relayer',
                },
            },
            relayerSchema,
            true,
        );
    });
});
describe('Relayer Registry', () => {
    it('should only contain valid Relayers', () => {
        validateAgainstSchema(relayers, relayerSchema);
    });
});
