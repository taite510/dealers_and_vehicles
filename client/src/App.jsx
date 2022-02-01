import React, { useState, useEffect } from 'react';
import { getDatasetId, getVehicleIds, getVehicleData, getDealerData, postAnswer } from '../../server/API.js';

function App(props) {

  useEffect(() => {
    getDatasetId((datasetId) => {
      console.log(datasetId)
      getVehicleIds(datasetId, (vehicleIds) => {
        console.log(vehicleIds)
        getVehicleData(datasetId, vehicleIds, (vehicleData) => {
          console.log(vehicleData)
          let dealerArr = []
          vehicleData.map(({dealerId}) => {
            if(dealerArr.indexOf(dealerId) === -1) {
              dealerArr.push(dealerId);
            }
          })
          getDealerData(datasetId, dealerArr, (dealerData) => {
            console.log(dealerData)
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
              console.log(response)
            })
          })
        })
      })
    })
  }, [])

  return (
    <h1>Hello world</h1>
  )
}

export default App;