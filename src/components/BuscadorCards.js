
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
    Subtitle,
    LineChart,
    Block,
    Col,
    BarChart,
    Icon
} from '@tremor/react';


import {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ArrowNarrowRightIcon,
    IdentificationIcon
} from '@heroicons/react/24/outline';


import { useState } from 'react';
import indicadores from '../data/indicadores.json';
import final from '../data/final.json'
import React, {createContext, useContext} from 'react'
import linear_data from '../data/linear_data.json';


const colors = {
    increase: 'emerald',
    moderateIncrease: 'emerald',
    unchanged: 'orange',
    moderateDecrease: 'rose',
    decrease: 'rose',
    Incremento: 'blue',
    Decremento: 'orange',
};

const icons = {
    Incremento: ArrowTrendingUpIcon,
    Decremento: ArrowTrendingDownIcon,
}
// Create function to read data from json file


// Create custom context to store selected term



const DataFromTermContext = React.createContext();

// DataFromTermContext.Provider[0] = ["hola"];


// Create a function that filters the data by the selected term and saves it in the context

const filterData = (selectedTerm) => {
    console.log("filterData")
    console.log(selectedTerm)
    // const filteredDataCuc = cucuta.filter((item) => item.indicador === selectedTerm);
    
    const filteredFinal = final.filter((item) => item.indicador_cuc === selectedTerm);

    console.log("filteredFinal:")
    console.log(filteredFinal)

    var ultimo_cuc_nds = null;
    var ultimo_cuc_col = null;
    var metrica_nds = null;
    var metrica_col = null;
    var deltaTextNds = '';
    var deltaTextCol = '';
    var deltaTypeNds = '';
    var deltaTypeCol = '';

    // Try y except para ultimo nds
    try {
        ultimo_cuc_nds = filteredFinal[0].ultimo_dato_cuc_nds.toFixed(2);
        metrica_nds = filteredFinal[0].ultimo_dato_nds.toFixed(2);
        var deltaTypeNds = ultimo_cuc_nds > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta
        
        if (deltaTypeNds === "Incremento") {

            // Crear texto para indicar que el delta es mayor al promedio departamental
            deltaTextNds = `Este indicador es ${Math.abs(ultimo_cuc_nds)}% superior al último puntaje departamental disponible (${metrica_nds}).`
        } else {
            // Crear texto para indicar que el delta es menor al promedio departamental
            deltaTextNds = `Este indicador es ${Math.abs(ultimo_cuc_nds)}% inferior al último puntaje departamental disponible (${metrica_nds}).`

        }
    }

    catch (error){
        deltaTextNds = 'No hay información disponible para el departamento.'
    }

    // Try y except para ultimo col
    try {
        ultimo_cuc_col = filteredFinal[0].ultimo_dato_cuc_col.toFixed(2);
        metrica_col = filteredFinal[0].ultimo_dato_col.toFixed(2);
        var deltaTypeCol = ultimo_cuc_col > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta para Colombia
        if (deltaTypeCol === "Incremento") {

            // Crear texto para indicar que el delta es mayor al promedio nacional
            deltaTextCol = `Este indicador es ${Math.abs(ultimo_cuc_col)}% superior al último puntaje nacional disponible (${metrica_col}).`
        } else {
            // Crear texto para indicar que el delta es menor al promedio nacional
            deltaTextCol = `Este indicador es ${Math.abs(ultimo_cuc_col)}% inferior al último puntaje nacional disponible (${metrica_col}).`

        }
    }

    catch (error){
        console.log("Error: " + error)
        deltaTextCol = 'No hay información disponible para el país.'
    }



    // Convertir fechas a formato mm/aaaa solo mes y el año
    // const ultimaFechaCuc = filteredFinal[0].ultima_fecha_cuc.split("-")[1] + "/" + filteredFinal[0].ultima_fecha_cuc.split("-")[0]
    const ultimaFechaCuc = new Date(filteredFinal[0].ultima_fecha_cuc).toISOString().slice(0, 10).split('-').reverse().join('/');


    // // Loop 3 times to create the three arrays
    const dataUltimo = {
        "indicador": filteredFinal[0].indicador_cuc,
        "tipo": "Último dato disponible",
        "metric": filteredFinal[0].ultimo_dato_cuc,
        "unidades": filteredFinal[0].unidad_medida_cuc,
        "fecha": ultimaFechaCuc,
        "delta_nds": ultimo_cuc_nds,
        "delta_col": ultimo_cuc_col,
        "delta_text_nds": deltaTextNds,
        "delta_text_col": deltaTextCol,
        "delta_type_nds": deltaTypeNds,
        "delta_type_col": deltaTypeCol
    }

    console.log("dataUltimo:")
    console.log(dataUltimo)


    // filteredDataCuc['ente'] = "Cúcuta";


    // AHORA LO MISMO PERO PARA EL PROMEDIO
    var promedio_cuc_nds = null;
    var promedio_cuc_col = null;
    var promedio_nds = null;
    var promedio_col = null;
    var deltaTextNds_prom = '';
    var deltaTextCol_prom = '';
    var deltaTypeNds_prom = '';
    var deltaTypeCol_prom = '';

    // Try y except para PROMEDIO nds
    try {
        promedio_cuc_nds = filteredFinal[0].promedio_cuc_nds.toFixed(2);
        promedio_nds = filteredFinal[0].promedio_nds.toFixed(2);
        var deltaTypeNds_prom = promedio_cuc_nds > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta
        
        if (deltaTypeNds_prom === "Incremento") {

            // Crear texto para indicar que el delta es mayor al promedio departamental
            deltaTextNds_prom = `Este indicador es ${Math.abs(promedio_cuc_nds)}% superior al promedio departamental (${promedio_nds}).`
        } else {
            // Crear texto para indicar que el delta es menor al promedio departamental
            deltaTextNds_prom = `Este indicador es ${Math.abs(promedio_cuc_nds)}% inferior al promedio departamental (${promedio_nds}).`
    
        }
    }

    catch (error){
        deltaTextNds_prom = 'No hay información disponible para el departamento.'
    }

    // Try y except para PROMEDIO col
    try {
        promedio_cuc_col = filteredFinal[0].promedio_cuc_col.toFixed(2);
        promedio_col = filteredFinal[0].promedio_col.toFixed(2);
        var deltaTypeCol_prom = promedio_cuc_col > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta para Colombia
        if (deltaTypeCol_prom === "Incremento") {

            // Crear texto para indicar que el delta es mayor al promedio nacional
            deltaTextCol_prom = `Este indicador es ${Math.abs(promedio_cuc_col)}% superior al promedio nacional (${promedio_col}).`
        } else {
            // Crear texto para indicar que el delta es menor al promedio nacional
            deltaTextCol_prom = `Este indicador es ${Math.abs(promedio_cuc_col)}% inferior al promedio nacional (${promedio_col}).`
    
        }
    }

    catch (error){
        console.log("Error: " + error)
        deltaTextCol_prom = 'No hay información disponible para el país.'
    }




    // Convertir fechas a formato dd/mm/aaaa
    // const promedioFechaCuc = new Date(filteredFinal[0].ultima_fecha_cuc).toISOString().slice(0, 10).split('-').reverse().join('/');


    // // Loop 3 times to create the three arrays
    const dataPromedio = {
        "indicador": filteredFinal[0].indicador_cuc,
        "tipo": "Promedio histórico",
        "metric": filteredFinal[0].promedio_cuc.toFixed(2),
        "unidades": filteredFinal[0].unidad_medida_cuc,
        // "fecha": ultimaFechaCuc,
        "delta_nds": promedio_cuc_nds,
        "delta_col": promedio_cuc_col,
        "delta_text_nds": deltaTextNds_prom,
        "delta_text_col": deltaTextCol_prom,
        "delta_type_nds": deltaTypeNds_prom,
        "delta_type_col": deltaTypeCol_prom
    }



    // AHORA PARA EL MINIMO

    var minimo_cuc_col = null;
    var minimo_cuc_nds = null;
    var minimo_col = null;
    var minimo_nds = null;
    var deltaTextNds_min = '';
    var deltaTextCol_min = '';
    var deltaTypeNds_min = '';
    var deltaTypeCol_min = '';

    // Try y except para MINIMO nds
    try {
        minimo_cuc_nds = filteredFinal[0].minimo_cuc_nds.toFixed(2);
        minimo_nds = filteredFinal[0].minimo_nds.toFixed(2);
        deltaTypeNds_min = minimo_cuc_nds > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta
        if (deltaTypeNds_min === "Incremento") {
    
            // Crear texto para indicar que el delta es mayor al minimo departamental
            deltaTextNds_min = `El mínimo histórico de este indicador es ${Math.abs(minimo_cuc_nds)}% superior al mínimo departamental (${minimo_nds}).`
        } else {
            // Crear texto para indicar que el delta es menor al minimo departamental
            deltaTextNds_min = `El mínimo histórico de este indicador es ${Math.abs(minimo_cuc_nds)}% inferior al mínimo departamental (${minimo_nds}).`
    
        }

    }

    catch (error){
        deltaTextNds_min = 'No hay información disponible para el departamento.'
    }

    // Try y except para MINIMO COL
    try {
        minimo_cuc_col = filteredFinal[0].minimo_cuc_col.toFixed(2);
        minimo_col = filteredFinal[0].minimo_col.toFixed(2);
        deltaTypeCol_min = minimo_cuc_col > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta para Colombia
        if (deltaTypeCol_min === "Incremento") {
    
            // Crear texto para indicar que el delta es mayor al mínimo nacional
            deltaTextCol_min = `El mínimo histórico de este indicador es ${Math.abs(minimo_cuc_col)}% superior al mínimo nacional (${minimo_col}).`
        } else {
            // Crear texto para indicar que el delta es menor al mínimo nacional
            deltaTextCol_min = `El mínimo histórico de este indicador es ${Math.abs(minimo_cuc_col)}% inferior al mínimo nacional (${minimo_col}).`
    
        }
    }

    catch (error){
        console.log("Error: " + error)
        deltaTextCol_min = 'No hay información disponible para el país.'
    }


    // Convertir fechas a formato dd/mm/aaaa
    const minFechaCuc = new Date(filteredFinal[0].min_date_cuc).toISOString().slice(0, 10).split('-').reverse().join('/');


    // // Loop 3 times to create the three arrays
    const dataMinimo = {
        "indicador": filteredFinal[0].indicador_cuc,
        "tipo": "Mínimo histórico",
        "metric": filteredFinal[0].minimo_cuc,
        "unidades": filteredFinal[0].unidad_medida_cuc,
        "fecha": minFechaCuc,
        "delta_nds": minimo_cuc_nds,
        "delta_col": minimo_cuc_col,
        "delta_text_nds": deltaTextNds_min,
        "delta_text_col": deltaTextCol_min,
        "delta_type_nds": deltaTypeNds_min,
        "delta_type_col": deltaTypeCol_min
    }




    // AHORA PARA EL MAXIMO

    var maximo_cuc_col = null;
    var maximo_cuc_nds = null;
    var maximo_col = null;
    var maximo_nds = null;
    var deltaTextNds_max = '';
    var deltaTextCol_max = '';
    var deltaTypeNds_max = '';
    var deltaTypeCol_max = '';

    // Try y except para MAXIMO nds
    try {
        maximo_cuc_nds = filteredFinal[0].maximo_cuc_nds.toFixed(2);
        maximo_nds = filteredFinal[0].maximo_nds.toFixed(2);
        deltaTypeNds_max = maximo_cuc_nds > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta
        if (deltaTypeNds_max === "Incremento") {
    
            // Crear texto para indicar que el delta es mayor al maximo departamental
            deltaTextNds_max = `El máximo histórico de este indicador es ${Math.abs(maximo_cuc_nds)}% superior al máximo departamental (${maximo_nds}).`
        } else {
            // Crear texto para indicar que el delta es menor al minimo departamental
            deltaTextNds_max = `El máximo histórico de este indicador es ${Math.abs(maximo_cuc_nds)}% inferior al máximo departamental (${maximo_nds}).`
    
        }
    }

    catch (error){
        deltaTextNds_max = 'No hay información disponible para el departamento.'
    }

    // Try y except para MAXIMO COL
    try {
        maximo_cuc_col = filteredFinal[0].maximo_cuc_col.toFixed(2);
        maximo_col = filteredFinal[0].maximo_col.toFixed(2);
        deltaTypeCol_max = maximo_cuc_col > 0 ? "Incremento" : "Decremento";

        // Escribiendo texto dependiendo del valor del delta para Colombia
        if (deltaTypeCol_max === "Incremento") {

            // Crear texto para indicar que el delta es mayor al maximo nacional
            deltaTextCol_max = `El máximo histórico de este indicador en Colombia es ${maximo_col}; el puntaje de Cúcuta es un ${Math.abs(maximo_cuc_col)}% superior.`
        } else {
            // Crear texto para indicar que el delta es menor al maximo nacional
            deltaTextCol_max = `El máximo histórico de este indicador en Colombia es ${maximo_col}; el puntaje de Cúcuta es un ${Math.abs(maximo_cuc_col)}% inferior.`
    
        }
    }

    catch (error){
        console.log("Error: " + error)
        deltaTextCol_max = 'No hay información disponible para el país.'
    }



    // Convertir fechas a formato dd/mm/aaaa
    const maxFechaCuc = new Date(filteredFinal[0].max_date_cuc).toISOString().slice(0, 10).split('-').reverse().join('/');


    // // Loop 3 times to create the three arrays
    const dataMaximo = {
        "indicador": filteredFinal[0].indicador_cuc,
        "tipo": "Máximo histórico",
        "metric": filteredFinal[0].maximo_cuc,
        "unidades": filteredFinal[0].unidad_medida_cuc,
        "fecha": maxFechaCuc,
        "delta_nds": maximo_cuc_nds,
        "delta_col": maximo_cuc_col,
        "delta_text_nds": deltaTextNds_max,
        "delta_text_col": deltaTextCol_max,
        "delta_type_nds": deltaTypeNds_max,
        "delta_type_col": deltaTypeCol_max
    }




    const all_cards = [dataUltimo, dataMinimo, dataMaximo];

    
    DataFromTermContext.Provider = all_cards;
    DataFromTermContext.Variable = [dataPromedio];

    // Setting prom data for bar chart
    var bar_data = [{
        'promedio': 'Promedio', 
        'Cúcuta': dataPromedio.metric,
        'Colombia': promedio_col,
        'NDS': promedio_nds}]

    DataFromTermContext.Promedios = bar_data;

    console.log("Provider: ")
    console.log(DataFromTermContext.Provider[0])
    // console.log(DataFromTermContext.Consumer)
    // return filteredData;
};

// Execute function to populate context with data from the first term
filterData('Índice de pobreza multidimensional - IPM');




const DataForLinear = React.createContext();

// NewData()

export const getLinearData = (selectedTerm) => {

    console.log("DESDE LINEAR, GET LINEAR DATA")
    console.log(selectedTerm)

    console.log("Linear data:")
    console.log(linear_data)

    console.log("linear_data_filtered:")
    console.log(linear_data_filtered)

    // filter data by selected term
    // const linear_data_filtered = linear_data.filter((item) => item.term === selectedTerm)

    var linear_data_filtered = linear_data[selectedTerm]

    // Check if linear_data_filtered is null
    if (linear_data_filtered == null){
        DataForLinear.Data = [{}];
    }

    else {


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
    
        
    
        DataForLinear.Data = linear_data_filtered;
    
        
        console.log("DataforLinear.Data")
        console.log(DataForLinear.Data)
    
        // Getting data for bar chart
        var data = DataFromTermContext.Variable[0];
    
        console.log("DataFromTermContext.Variable[0]")
        console.log(DataFromTermContext.Variable[0])


    }


    
    
}


console.log("DataforLinear.Provider afuera")
console.log(DataForLinear.Data)


const VariableName = React.createContext();
const predefined_value = "Incidencia de la pobreza monetaria extrema - Actualización metodológica"
export const setVariableName = (selectedTerm) => {

    // Variable used to keep the selected term even when changing pages
    VariableName.name = selectedTerm;
    console.log("new VariableName.name defined: ")
    console.log(VariableName.name)

}

// If variable name is empty, set it to the first term
if (VariableName.name === undefined || VariableName.name === ""){

    console.log("VariableName.name es undefined, se cumple:")
    console.log(VariableName.name)
    VariableName.name = predefined_value;
    
}

else {
    console.log("VariableName.name no es undefined, no se cumple:")
    console.log(VariableName.name)
}

filterData(VariableName.name);
getLinearData(VariableName.name);

// 

export default function BuscadorCards() {
    var [selectedTerm, setSelectedTerm] = useState(predefined_value);
    // const { setIndicador } = useContext(SelectedTermContext)
    // const [filteredData, setFilteredData] = useState(1);
    return (

        <>

            <SelectBox defaultValue={VariableName.name} onValueChange={(value) => {setSelectedTerm(value); filterData(value); getLinearData(value); setVariableName(value)}} on marginTop="mt-3" gapX='gap-x-6' gapY='gap-y-6'>

            {/* Create a select box item for each entry in categories select */}


                {indicadores.map((item, i) => 
                    <SelectBoxItem value={item} text={item}/>)}
            

            </SelectBox>

            <Title marginTop="mt-8">Resumen de la variable en Cúcuta</Title> 
            <Text>En estas tarjetas se muestra el último dato registrado, el mínimo y el máximo histórico para Cúcuta.</Text>


            <ColGrid numColsSm={ 2 } numColsLg={ 3 } marginTop="mt-4" gapX='gap-x-6' gapY='gap-y-6' >

            {/* Cards */}

            

            { DataFromTermContext.Provider.map((item, i) => (

                // Si quiero que se generen las tarjetas de forma indefinida, usaria un key difere
                <Card key={ i }>
                    <Text>{ item.tipo } { " - "} {item.fecha } </Text>

                    <Flex
                        justifyContent="justify-start"
                        alignItems="items-baseline"
                        spaceX="space-x-3"
                        truncate={ true }
                    >
                        <Metric>{ item.metric }</Metric>
                        <Text>{ item.unidades }</Text>
                    </Flex>


                                    {/* <Flex justifyContent="justify-start" spaceX="space-x-2" marginTop="mt-4"> */}
                    <Callout
                        title={ `${item.delta_type_nds} (${item.delta_nds})` }
                        text={ item.delta_text_nds }
                        icon={ icons[item.delta_type_nds] }
                        color={ colors[item.delta_type_nds]}
                        marginTop="mt-6"
                    />

                    {/* </Flex> */}

                    <Callout
                        title={ `${item.delta_type_col} (${item.delta_col})` }
                        text={ item.delta_text_col }
                        icon={ icons[item.delta_type_col] }
                        color={ colors[item.delta_type_col]}
                        marginTop="mt-6"
                    />


                </Card>
            )) } 
            


             </ColGrid>


             <Title marginTop="mt-8">Histórico de la variable en Cúcuta, Norte de Santander y Colombia</Title>
             <Text>En esta sección se compara el comportamiento histórico de la variable en Cúcuta con respecto a Norte de Santander y a Colombia.</Text>
             

             <ColGrid numCols={1} numColsSm={2} numColsLg={3} gapX="gap-x-2" gapY="gap-y-2" marginTop="mt-4">
                {/* Una Col en realidad es una fila. Una fila de items. Una fila horizontal. */}
                <Col numColSpan={1} numColSpanLg={2}>
                    {/* <Block marginTop="mt-6"> */}
                            <Card key = {"own-key"}>
                                {/* <div className="h-80" /> */}
                                <Title>{selectedTerm}</Title>

                                {/* Aqui se imprime lo que se va a graficar. IMPORTANTE */}
                                {/* <h1>{JSON.stringify(DataForLinear.Data, null, 2)}</h1> */}
                                    <LineChart
                                        data={DataForLinear.Data}
                                        dataKey="year"
                                        categories={["dato_cuc", "dato_nds", "dato_col"]}
                                        colors={["blue", "red", "green"]}
                                        // valueFormatter={dataFormatter}  
                                        marginTop="mt-6"         
                                        yAxisWidth="w-10"
                                    />
                            </Card>
                    {/* </Block> */}
                </Col>

                
                <Card>
                    <Title>Comparación de promedios</Title>

                    <BarChart
                        data={DataFromTermContext.Promedios}
                        dataKey="promedio"
                        categories={["Cúcuta", "NDS", "Colombia"]}
                        colors={["blue", "red", "green"]}
                        // valueFormatter={dataFormatter}
                        marginTop="mt-6"
                        yAxisWidth="w-10"
                    />
                </Card>

                

            </ColGrid>





        </>




   

    )
}




// export default function BuscadorCards() {
//     const [selectedTerm, setSelectedTerm] = useState(1);
//     // const [filteredData, setFilteredData] = useState(1);
//     return (

//         <>

//             <SelectBox defaultValue={'Índice de pobreza multidimensional - IPM'} handleSelect={(value) => {setSelectedTerm(value); filterData(value)}} on marginTop="mt-3" gapX='gap-x-6' gapY='gap-y-6'>

//             {/* Create a select box item for each entry in categories select */}



//                 {indicadores.map((item, i) => 
//                     <SelectBoxItem value={item} text={item}/>)}

//                 {/* <SelectBoxItem value={1} text="Kilometers"/>
//                 <SelectBoxItem value={2} text="Meters"/>
//                 <SelectBoxItem value={3} text="Miles" />
//                 <SelectBoxItem value={4} text="Nautical Miles"/> */}
            

//             </SelectBox>

//             {/* Write h1 with selected term */}
//             <h1>{selectedTerm}</h1>
//             <h1>{JSON.stringify(DataFromTermContext.Provider[0], null, 2)}</h1>
//             <h1>{JSON.stringify(DataFromTermContext.Provider[0], null, 2)}</h1>



//             {/* {filteredData = filterData(cucuta, selectedTerm)} */}

//             {/* const filteredData = filterData(cucuta, selectedTerm); */}

//             <ColGrid numColsSm={ 2 } numColsLg={ 3 } marginTop="mt-6" gapX='gap-x-6' gapY='gap-y-6' >

//             {/* Cards */}

//             { DataFromTermContext.Provider.map((item) => (
//                 <Card key={ item.indicador }>
//                     <Text>{ item.tipo } { " - "} {item.fecha } </Text>
//                     {/* <Text truncate={ true }> {item.fecha } </Text> */}
//                     {/* <Text truncate={ true }> {item.fecha } </Text> */}
//                     <Flex
//                         justifyContent="justify-start"
//                         alignItems="items-baseline"
//                         spaceX="space-x-3"
//                         truncate={ true }
//                     >
//                         <Metric>{ item.metric }</Metric>
//                         <Text>{ item.unidades }</Text>
//                     </Flex>

//                     <Flex justifyContent="justify-start" spaceX="space-x-2" marginTop="mt-4">
//                     <Callout
//                         title={ `${item.delta_type_nds} (${item.delta_nds})` }
//                         text={ item.delta_text_nds }
//                         icon={ item.icon }
//                         color={ colors[item.delta_type_nds]}
//                         marginTop="mt-6"
//                     />

//                     </Flex>

//                     <Callout
//                         title={ `${item.delta_type_col} (${item.delta_col})` }
//                         text={ item.delta_text_col }
//                         icon={ item.icon }
//                         color={ colors[item.delta_type_col]}
//                         marginTop="mt-6"
//                     />

//                     {/* <Flex justifyContent="justify-start" spaceX="space-x-2" marginTop="mt-4">
//                         <BadgeDelta deltaType={ item.delta_type_nds } />
//                         <Flex justifyContent="justify-start" spaceX="space-x-1" truncate={ true }>
//                             <Text color={ colors[item.deltaTypeNds] }>{ item.delta_nds }</Text>
//                             <Text truncate={ true }>% vs. Norte de Santander </Text>
//                         </Flex>
//                     </Flex>
//                     <Flex justifyContent="justify-start" spaceX="space-x-2" marginTop="mt-4">
//                         <BadgeDelta deltaType={ item.delta_type_col } />
//                         <Flex justifyContent="justify-start" spaceX="space-x-1" truncate={ true }>
//                             <Text color={ colors[item.deltaTypeCol] }>{ item.delta_col }</Text>
//                             <Text truncate={ true }>% vs. Colombia </Text>
//                         </Flex>
//                     </Flex> */}
//                 </Card>
//             )) }

//             {/* { DataFromTermContext.Provider[0].map((item) => (
//                 <Card key={ item.title }>
//                     <Text>{ item.title }</Text>
//                     <Flex
//                         justifyContent="justify-start"
//                         alignItems="items-baseline"
//                         spaceX="space-x-3"
//                         truncate={ true }
//                     >
//                         <Metric>{ item.metric }</Metric>
//                         <Text truncate={ true }>
//                             from
//                             { ' ' }
//                             { item.metricPrev }
//                         </Text>
//                     </Flex>
//                     <Flex justifyContent="justify-start" spaceX="space-x-2" marginTop="mt-4">
//                         <BadgeDelta deltaType={ item.deltaType } />
//                         <Flex justifyContent="justify-start" spaceX="space-x-1" truncate={ true }>
//                             <Text color={ colors[item.deltaType] }>{ item.delta }</Text>
//                             <Text truncate={ true }> to previous month </Text>
//                         </Flex>
//                     </Flex>
//                 </Card>
//             )) }
//              */}
//              </ColGrid>

//         </>

   

//     )
// }