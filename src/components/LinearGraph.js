
import {
    Card,
    Metric,
    Text,
    Flex,
    BadgeDelta,
    DeltaType,
    Color,
    ColGrid,
    Callout,
    SelectBox, SelectBoxItem,
    Title,
    LineChart
} from '@tremor/react';

import linear_data from '../data/linear_data.json';
// import DataFromTermContext from '../components/BuscadorCards';
import React, {createContext, useContext} from 'react'
import SelectedTermContext from './Dashboard';

console.log("DESDE LINEAR, LINEAR DATA:")
console.log(linear_data)

const chartdata = [
    {
      year: Date(1448928000000),
      "Population growth rate": 1.74,
      "Valor 2": 2.5,
    },
    {
      year: 1952,
      month: "Jan",
      "Population growth rate": 1.93,
       "Valor 2": 2.5,
    },
    {
      year: 1953,
      "Population growth rate": 1.9,

        
    },
    {
      year: 1954,
      "Population growth rate": 1.98,
        "Valor 2": 2.5,
    },
    {
      year: 1955,
      "Population growth rate": 2,
      "Valor 2": 2.5,
    },
  ];
  
  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

// console.log("DESDE LINEAR, DATA FROM TERM CONTEXT")
// console.log(DataFromTermContext[0])


const DataForLinear = React.createContext();

// NewData()

export const getLinearData = (selectedTerm) => {

    console.log("DESDE LINEAR, GET LINEAR DATA")
    console.log(selectedTerm)

    console.log("Linear data:")
    console.log(linear_data)

    // filter data by selected term
    // const linear_data_filtered = linear_data.filter((item) => item.term === selectedTerm)

    var linear_data_filtered = linear_data[selectedTerm]

    console.log("Linear data filtered:")
    console.log(linear_data_filtered)

    for (const i of linear_data_filtered) {

        i.fecha = new Date(i.fecha_cuc)

        // Extract year from date

        // Extraer año de la fecha
        const a = new Date(i.fecha_cuc).getFullYear();
        i.year = a;

        
        }
        

    console.log("DESDE LINEAR, LINEAR DATA FILTERED LENGTH")
    console.log(linear_data_filtered.length)

    console.log("DESDE LINEAR, LINEAR DATA FILTERED")
    console.log(linear_data_filtered)

    

    DataForLinear.Provider = linear_data_filtered;

    
    console.log("DataforLinear.Provider")
    console.log(DataForLinear.Provider)
    
    
    console.log("chartdata")
    console.log(chartdata)

}

getLinearData("Índice de pobreza multidimensional - IPM")
// 

console.log("DataforLinear.Provider afuera")
console.log(DataForLinear.Provider)


export default function LinearGraph() {

  console.log("DESDE LINEAR, LINEARGRAPH")
  console.log("DataforLinear.Provider LINEARGRAPH")
  console.log(DataForLinear.Provider)


    return (
        <>
            <Title>Population growth rate (1951 to 2021)</Title>
            <h1>{JSON.stringify(DataForLinear.Provider, null, 2)}</h1>
                <LineChart
                    data={DataForLinear.Provider}
                    dataKey="year"
                    categories={["dato_cuc", "dato_nds", "dato_col"]}
                    colors={["blue", "red", "green"]}
                    // valueFormatter={dataFormatter}  
                    marginTop="mt-6"         
                    yAxisWidth="w-20"
                />
                {/* <LineChart
                    data={chartdata}
                    dataKey="year"
                    categories={["Population growth rate"]}
                    colors={["blue"]}
                    // valueFormatter={dataFormatter}  
                    marginTop="mt-6"         
                    yAxisWidth="w-20"
                /> */}
        </>
    )
}