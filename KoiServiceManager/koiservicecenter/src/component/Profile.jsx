import React, { useEffect, useState } from 'react';
import { getUserId } from '../utils.jsx';
import { fetchUserID } from '../config/api.jsx';
import FishTable from './FishTable.jsx';
import CustomerOrders from './CustomerOrders.jsx';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showFishTable, setShowFishTable] = useState(false);
    const [showCustomerOrders, setShowCustomerOrders] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const userId = getUserId();
            const userData = await fetchUserID(userId);
            setUser(userData);
        };

        loadUserData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Profile Information</h2>
            <p><b>UserID:</b> {user.userID}</p>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone Number:</b> {user.phoneNumber}</p>
            <p><b>Role:</b> {user.role}</p>
            <p><b>Address:</b> {user.address}</p>

            <button onClick={() => setShowFishTable(!showFishTable)}>
                {showFishTable ? 'Hide Fish Table' : 'Show Fish Table'}
            </button>
            {showFishTable && <FishTable userID={user.userID} role={'C'} />}

            <button onClick={() => setShowCustomerOrders(!showCustomerOrders)}>
                {showCustomerOrders ? 'Hide Customer Orders' : 'Show Customer Orders'}
            </button>
            {showCustomerOrders && <CustomerOrders userID={user.userID} />}
        </div>
    );
};

export default Profile;
