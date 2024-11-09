import VeterinaOrders from './VeterinaOrders.jsx'
import { getUserId } from '../src/utils/utils.jsx'
import { fetchVeterinas } from '../src/config/api.jsx'
import { useEffect, useState } from 'react';
import VeterinaSchedule from './VeterinaSchedule.jsx';


const VeterinaPage = () => {
    const [veterinaID, setVeterinaID] = useState('');

    useEffect(() => {
        const VeterinaData = async () => {
            const userID = getUserId();
            const veterinasData = await fetchVeterinas();
            sessionStorage.setItem('vetedata', JSON.stringify(veterinasData.find(vet => vet.userID === userID)));
            setVeterinaID(JSON.parse(JSON.stringify(veterinasData.find(vet => vet.userID === userID))).veterinaID);
        }
        VeterinaData();
    }, []);


    return (
        <>
            <VeterinaSchedule veterinaId={veterinaID} />
            <VeterinaOrders />
            
        </>
        
    );
}

export default VeterinaPage