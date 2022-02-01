const assert = require('assert');
const { getDatasetId, getVehicleIds, getVehicleData, getDealerData, postAnswer } = require('../server/API.js')
const testDatasetId = 'Te0zQETl2Qg';
const testVehicleIds = [
  1844631511,
  1289164556,
  2062177301,
  1410398910,
  28535918,
  1690498756,
  1651310283,
  350235445,
  1020798083
];

describe('API Test', function() {
    it('should return something', function(done) {
      let vehicleIds
      getVehicleIds(testDatasetId, (data) => {
        vehicleIds = data
        assert.equal(vehicleIds, testVehicleIds);
        done()
      })
    });

});