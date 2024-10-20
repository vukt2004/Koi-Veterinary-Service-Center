import VeterinaOrders from './VeterinaOrders.jsx'
import { jwtDecode } from 'jwt-decode';
import { fetchVeterinas } from '../src/config/api.jsx'
import React, { useEffect, useState } from 'react';



const VeterinaPage = () => {

    useEffect(() => {
        const VeterinaData = async () => {
            const userID = jwtDecode(sessionStorage.getItem('user')).sub
            const veterinasData = await fetchVeterinas();
            sessionStorage.setItem('vetedata', JSON.stringify(veterinasData.find(vet => vet.userID === userID)));
        }
        VeterinaData();
    },[]);
    return (
        <VeterinaOrders />
    );
}

export default VeterinaPage