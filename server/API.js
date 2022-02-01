const axios = require('axios');

module.exports = {
  postShirt: (data, cb) => {
    axios.post('http://localhost:5000/api/shirts', data)
    .then(data => cb(data.data))
  },
  getAllShirts: (cb) => {
    axios.get('http://localhost:5000/api/shirts')
    .then(data => cb(data.data))
  },
  likeShirt: (id, cb) => {
    axios.put('http://localhost:5000/api/like', { id })
    .then(data => cb(data.data))
  }
}