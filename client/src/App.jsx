import React, { useState, useEffect } from 'react';
import { getDatasetId, getVehicleIds, getVehicleData, getDealerData, postAnswer } from '../../server/API.js';

function App(props) {
  const [ status, setStatus ] = useState({ isLoading: false, data: false })
  let handleClick = () => {
    setStatus({isLoading: true, data: false})
    getDatasetId((datasetId) => {
      getVehicleIds(datasetId, (vehicleIds) => {
        getVehicleData(datasetId, vehicleIds, (vehicleData) => {
          let dealerArr = []
          vehicleData.map(({dealerId}) => {
            if(dealerArr.indexOf(dealerId) === -1) {
              dealerArr.push(dealerId);
            }
          })
          getDealerData(datasetId, dealerArr, (dealerData) => {
            let answer = {
              dealers: dealerData
            }
            answer.dealers.forEach((dealership) => {
              dealership.vehicles = [];
              vehicleData.map((data) => {
                if (data.dealerId === dealership.dealerId) {
                  dealership.vehicles.push({
                    vehicleId: data.vehicleId,
                    year: data.year,
                    make: data.make,
                    model: data.model
                  })
                }
              })
            })
            postAnswer(datasetId, answer, (response) => {
              setStatus({isLoading: false, data: response})
            })
          })
        })
      })
    })
  }
  if (status.isLoading) {
    return (
      <button>
        <img src='spiffygif_46x46.gif' alt="loading gif while page load"/>
      </button>
    )
  } else if (!status.data) {
    return (
      <button onClick={handleClick}>GET/POST to API</button>
    )
  } else {
    return (
      <div>
        <h1>{status.data.message}</h1>
        <h4>Number of milliseconds: &nbsp;
          <b>{status.data.totalMilliseconds}</b>
        </h4>
      </div>
    )
  }

}

export default App;