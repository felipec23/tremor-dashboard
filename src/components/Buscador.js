import {

    SelectBox, SelectBoxItem
} from '@tremor/react';

import React, {createContext, useContext} from 'react'
import SummaryCard from './SummaryCard';
import { useState } from 'react';
import { useMyContext } from './provider';




export default function Buscador() {
    const [state, setState] = useContext(useMyContext);
    return (


        <SelectBox defaultValue={1} handleSelect={(value) => {setState(value)}}  marginTop="mt-3" gapX='gap-x-6' gapY='gap-y-6'>

            <SelectBoxItem value={1} text="Kilometers"/>
            <SelectBoxItem value={2} text="Meters"/>
            <SelectBoxItem value={3} text="Miles" />
            <SelectBoxItem value={4} text="Nautical Miles"/>
        </SelectBox>

   

    )
}


// export default Buscador

// export default function Buscador() {
//     const [selectedTerm, setSelectedTerm] = useState(1);
//     return (

    
//         <SelectBox defaultValue={1} handleSelect={(value) => setSelectedTerm(value)}  marginTop="mt-3" gapX='gap-x-6' gapY='gap-y-6'>

//             console.log(selectedTerm)
//             <SelectBoxItem value={1} text="Kilometers"/>
//             <SelectBoxItem value={2} text="Meters"/>
//             <SelectBoxItem value={3} text="Miles" />
//             <SelectBoxItem value={4} text="Nautical Miles"/>
//         </SelectBox>
   

//     )
// }

// FUNCIONAL:

// export default function Buscador() {
//     return (

    
//         <SelectBox defaultValue={1} handleSelect={(value) => console.log(value)}  marginTop="mt-3" gapX='gap-x-6' gapY='gap-y-6'>

//             <SelectBoxItem value={1} text="Kilometers"/>
//             <SelectBoxItem value={2} text="Meters"/>
//             <SelectBoxItem value={3} text="Miles" />
//             <SelectBoxItem value={4} text="Nautical Miles"/>
//         </SelectBox>
   

//     )
// }




// PaSar el valor del select a la card

// export const BuscadorContext = createContext();

// const Buscador = () => {
//     const [selectedTerm, setSelectedTerm] = useState(1);
//     return (

    
//         <SelectBox defaultValue={1} handleSelect={(value) => setSelectedTerm(value)}  marginTop="mt-3" gapX='gap-x-6' gapY='gap-y-6'>

//             console.log(selectedTerm)
//             <SelectBoxItem value={1} text="Kilometers"/>
//             <SelectBoxItem value={2} text="Meters"/>
//             <SelectBoxItem value={3} text="Miles" />
//             <SelectBoxItem value={4} text="Nautical Miles"/>
//         </SelectBox>
   

//     )
// }

// export default Buscador




// export const BuscadorProvider = ({children}) => {
//     const [buscador, setBuscador] = useState(1);

//     return (
//         <BuscadorContext.Provider value={{buscador, setBuscador}}>
//             {children}
//         </BuscadorContext.Provider>
//     )
// }

