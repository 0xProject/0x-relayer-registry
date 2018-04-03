"use strict";
exports.__esModule = true;
var chai = require("chai");
var dirtyChai = require("dirty-chai");
var json_schemas_1 = require("@0xproject/json-schemas");
require("mocha");
var schemas_1 = require("../schemas");
var relayers = require("../../relayers.json");
chai.config.includeStack = true;
chai.use(dirtyChai);
var expect = chai.expect;
var schemaValidator = new json_schemas_1.SchemaValidator();
schemaValidator.addSchema(schemas_1.relayerSchema);
schemaValidator.addSchema(schemas_1.relayersSchema);
var validateAgainstSchema = function (testCases, schema, shouldFail) {
    if (shouldFail === void 0) { shouldFail = false; }
    for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
        var testCase = testCases_1[_i];
        var validationResult = schemaValidator.validate(testCase, schema);
        var hasErrors = validationResult.errors.length !== 0;
        if (shouldFail) {
            if (!hasErrors) {
                throw new Error("Expected testCase: " + JSON.stringify(testCase, null, '\t') + " to fail and it didn't.");
            }
        }
        else {
            if (hasErrors) {
                throw new Error(JSON.stringify(validationResult.errors, null, '\t'));
            }
        }
    }
};
describe('Relayers', function () {
    describe('#relayersRegistry', function () {
        it('should only contain valid Relayers', function () {
            validateAgainstSchema([relayers], schemas_1.relayersSchema);
        });
    });
}); // tslint:disable:max-file-line-count
