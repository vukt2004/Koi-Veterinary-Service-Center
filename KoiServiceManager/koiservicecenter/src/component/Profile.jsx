// Profile.jsx
import React, { useEffect, useState } from 'react';
import { getUserId } from '../utils.jsx';
import { fetchUserID } from '../config/api.jsx';
import FishTable from './FishTable.jsx';
import CustomerOrders from './CustomerOrders.jsx'

const Profile = () => {
    const [user, setUser] = useState(null);

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
            <p><strong>UserID:</strong> {user.userID}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Address:</strong> {user.address}</p>

            <h3>Fish Data</h3>
            <FishTable userID={user.userID} role={user.role} />
            <CustomerOrders userID={user.userID} />
        </div>
    );
};

export default Profile;
