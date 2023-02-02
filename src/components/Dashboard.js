import {
    Card,
    Title,
    Text,
    Tab,
    TabList,
    ColGrid,
    Block,
    Subtitle
} from '@tremor/react';

import { useState } from 'react';
import SummaryCard from './SummaryCard';
import Buscador from './Buscador';
import BuscadorCards from './BuscadorCards';
import LinearGraph from './LinearGraph';

import React, {createContext, useContext} from 'react'



export default function Dashboard() {
    const [selectedView, setSelectedView] = useState(1);

    return (



        <main className='bg-slate-200 p-6 sm:p-10'>

            
            <Title>Dashboard</Title>
            <Text>Cada tarjeta muestra el dato en Cúcuta. Luego, se compara el indicador contra Norte de Santander y contra Colombia.</Text>

            <TabList defaultValue={ 1 } handleSelect={ (value) => setSelectedView(value) } marginTop="mt-6">
                <Tab value={ 1 } text="Exploración" />
                <Tab value={ 2 } text="Informe" />
            </TabList>

            {/* console.log(selectedView) */}
            { selectedView === 1 ? (
                <>
                    <Text marginTop="mt-6">Escribe y selecciona cualquier indicador que desees explorar:</Text>
                    {/* <Buscador />
                    <SummaryCard />  */}


                    <BuscadorCards />



                </>
            ) : (
                <Block marginTop="mt-6">
                    <Card>
                        <div className="h-96" />
                    </Card>
                </Block>
            ) }
        </main>
    );
}