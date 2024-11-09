import VeterinaOrders from './VeterinaOrders.jsx'
import { getUserId } from '../src/utils/utils.jsx'
import { fetchVeterinas } from '../src/config/api.jsx'
import React, { useEffect, useState } from 'react';
import VeterinaSchedule from './VeterinaSchedule.jsx';
import VeterinaProfile from './VeterinaProfile.jsx'



const VeterinaPage = () => {

    useEffect(() => {
        const VeterinaData = async () => {
            const userID = getUserId();
            const veterinasData = await fetchVeterinas();
            sessionStorage.setItem('vetedata', JSON.stringify(veterinasData.find(vet => vet.userID === userID)));
        }
        VeterinaData();
    },[]);

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");
        window.location.href = "/";
      };
    return (
        <>
        <p>Logout</p>
        <button onClick={()=>handleLogout()}>Logout</button>
        <VeterinaSchedule/>
        <VeterinaOrders />  
        </>
        
    );
}

export default VeterinaPage