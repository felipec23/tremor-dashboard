
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

const DataForLinear = React.createContext();


export const getLinearData = (selectedTerm) => {

    console.log("DESDE LINEAR, GET LINEAR DATA")
    console.log(selectedTerm)

    console.log("Linear data:")
    console.log(linear_data)

    var linear_data_filtered = linear_data[selectedTerm]

    console.log("Linear data filtered:")
    console.log(linear_data_filtered)

    for (const i of linear_data_filtered) {

        i.fecha = new Date(i.fecha_cuc)

        // Extract year from date
        const a = new Date(i.fecha_cuc).getFullYear();
        i.year = a;

        
        }

    DataForLinear.Provider = linear_data_filtered;
}

getLinearData("Índice de pobreza multidimensional - IPM")
// 


export default function LinearGraph() {


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
        </>
    )
}