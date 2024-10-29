import React, { useEffect, useState } from 'react';
import { fetchFish, addFish, updateFish, deleteFish } from '../config/api.jsx';

const FishTable = ({ userID, role }) => {
    const [fishList, setFishList] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFish, setNewFish] = useState({
        weight: '',
        length: '',
        month: '',
        describe: ''
    });

    const loadFishData = async () => {
        try {
            const fishData = await fetchFish(userID);
            setFishList(fishData);
        } catch (error) {
            console.error("Failed to fetch fish data:", error);
        }
    };

    useEffect(() => {
        loadFishData();
    }, [userID]);


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
        try {
            const newFishData = { ...newFish, userID };
            const result = await addFish(newFishData);

            if (result && !result.error) {
                setShowAddForm(false);
                setNewFish({ weight: '', length: '', month: '', describe: '' });
                loadFishData(); // Reload fish list
            } else {
                console.error("Failed to add fish:", result?.error);
            }
        } catch (error) {
            console.error("Error adding fish:", error);
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
                            <label>Weight(kg):
                                <input type="number" name="weight" value={newFish.weight} onChange={handleInputChange} required />
                            </label>
                            <label>Length(cm):
                                <input type="number" name="length" value={newFish.length} onChange={handleInputChange} required />
                            </label>
                            <label>Month Age:
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

            {fishList.length > 0 ? (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Fish ID</th>
                            <th>Weight</th>
                            <th>Length</th>
                            <th>Month Age</th>
                            <th>Description</th>
                            {role === 'C' && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {fishList.map(fish => (
                            <tr key={fish.fishID}>
                                <td>{fish.fishID}</td>
                                <td>{fish.weight}</td>
                                <td>{fish.length}</td>
                                <td>{fish.month}</td>
                                <td>{fish.describe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <tr>
                    <td colSpan={role === 'C' ? 6 : 5}>No fish data available</td>
                </tr >
            )
            }
        </div >
    );
};

export default FishTable;
