const axios = require('axios');

module.exports = {
  getDatasetId: (cb) => {
    axios.get('http://api.coxauto-interview.com/api/datasetId')
    .then(({ data }) => cb(data.datasetId))
  },
  getVehicleIds: (datasetId, cb) => {
    axios.get(`http://api.coxauto-interview.com/api/${datasetId}/vehicles`)
    .then(({ data }) => cb(data.vehicleIds))
  },
  getVehicleData: (datasetId, vehicleIds, cb) => {
    axios.all(vehicleIds.map((carId) => axios.get(`http://api.coxauto-interview.com/api/${datasetId}/vehicles/${carId}`)))
    .then(carData => {
      let carDataArr = [];
      carData.map(({ data }) => {
        carDataArr.push(data)
      })
      cb(carDataArr)
    })
  },
  getDealerData: (datasetId, dealerIds, cb) => {
    axios.all(dealerIds.map((dealerId) => axios.get(`http://api.coxauto-interview.com/api/${datasetId}/dealers/${dealerId}`)))
    .then(dealerData => {
      let dealerDataArr = [];
      dealerData.map(({ data }) => {
        dealerDataArr.push(data);
      })
      cb(dealerDataArr)
    })
  },
  postAnswer: (datasetId, answer, cb) => {
    axios.post(`http://api.coxauto-interview.com/api/${datasetId}/answer`, answer)
    .then(({data}) => cb(data))
  }
}