const axios = require('axios')

const resolver = {
launch: () => 
      {
        return axios
          .get('https://api.spacexdata.com/v3/launches/latest')
          .then(res => res.data)
      }
}

module.exports = resolver;