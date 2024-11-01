import React, { useEffect, useState } from 'react';
import { fetchFish, addFish, updateFish, deleteFish } from '../config/api.jsx';

const FishTable = ({ userID, role }) => {
    const [fishList, setFishList] = useState([]);
    const [expandedFish, setExpandedFish] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFish, setNewFish] = useState({
        weight: '',
        length: '',
        month: '',
        describe: ''
    });
    const [editFishId, setEditFishId] = useState(null); // Track which fish is being edited

    const loadFishData = async () => {
        const fishData = await fetchFish(userID);
        setFishList(fishData);
    };

    useEffect(() => {
        loadFishData();
    }, [userID]);

    const toggleFishDetails = (fishID) => {
        setExpandedFish((prev) => ({
            ...prev,
            [fishID]: !prev[fishID]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFish((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Add new fish
    const handleAddFish = async (e) => {
        e.preventDefault();
        const newFishData = { ...newFish, userID };
        const result = await addFish(newFishData);

        if (result && !result.error) {
            setShowAddForm(false);
            setNewFish({ weight: '', length: '', month: '', describe: '' });
            loadFishData(); // Reload fish list
        }
    };

    // Edit fish
    const handleEditFish = async (fishId) => {
        const result = await updateFish(fishId, { ...newFish, userID });

        if (result && !result.error) {
            setEditFishId(null); // Stop editing
            setNewFish({ weight: '', length: '', month: '', describe: '' });
            loadFishData(); // Reload fish list
        }
    };

    // Delete fish
    const handleDeleteFish = async (fishId) => {
        const result = await deleteFish(fishId);

        if (result && !result.error) {
            loadFishData();
        }
    };

    return (
        <div>
            {role === 'C' && (
                <div>
                    <button onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cancel' : 'Add Fish'}
                    </button>
                    {showAddForm && (
                        <form onSubmit={handleAddFish}>
                            <label>Weight:
                                <input type="number" name="weight" value={newFish.weight} onChange={handleInputChange} required />
                            </label>
                            <label>Length:
                                <input type="number" name="length" value={newFish.length} onChange={handleInputChange} required />
                            </label>
                            <label>Month:
                                <input type="number" name="month" value={newFish.month} onChange={handleInputChange} required />
                            </label>
                            <label>Description:
                                <input type="text" name="describe" value={newFish.describe} onChange={handleInputChange} required />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            )}
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Fish ID</th>
                        <th>Weight</th>
                        <th>Length</th>
                        <th>Month</th>
                        <th>Description</th>
                        {role === 'C' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {fishList.length > 0 ? (
                        fishList.map(fish => (
                            <React.Fragment key={fish.fishID}>
                                <tr onClick={() => toggleFishDetails(fish.fishID)} style={{ cursor: 'pointer' }}>
                                    <td>{fish.fishID}</td>
                                    <td>{fish.weight}</td>
                                    <td>{fish.length}</td>
                                    <td>{fish.month}</td>
                                    <td>{fish.describe}</td>
                                    {role === 'C' && (
                                        <td>
                                            {editFishId === fish.fishID ? (
                                                <>
                                                    <button onClick={() => handleEditFish(fish.fishID)}>Save</button>
                                                    <button onClick={() => setEditFishId(null)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => {
                                                        setEditFishId(fish.fishID);
                                                        setNewFish({ weight: fish.weight, length: fish.length, month: fish.month, describe: fish.describe });
                                                    }}>Update</button>
                                                    <button onClick={() => handleDeleteFish(fish.fishID)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                                {expandedFish[fish.fishID] && (
                                    <tr>
                                        <td colSpan={role === 'C' ? 6 : 5}>
                                            <div>
                                                <strong>Expanded Details:</strong>
                                                <p>Weight: {fish.weight}</p>
                                                <p>Length: {fish.length}</p>
                                                <p>Month: {fish.month}</p>
                                                <p>Description: {fish.describe}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={role === 'C' ? 6 : 5}>No fish data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FishTable;
