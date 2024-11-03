import React, { useEffect, useState } from 'react';
import { fetchFish, addFish } from '../config/api.jsx';
import './css/FishTable.css'; // Ensure to use the correct CSS file

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
        <section className="fish-table-container">

            {fishList.length > 0 ? (
                <table className="fish-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Trọng lượng</th>
                            <th>Độ dài</th>
                            <th>Tháng tuổi</th>
                            <th>Mô tả</th>
                            {role === 'C' && (
                                <>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </>
                            )}
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
                                {role === 'C' && (
                                    <>
                                        <td><button className="update-button">Cập nhật</button></td>
                                        <td><button className="delete-button">Xóa</button></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-data-message">
                    Bạn chưa thêm con cá nào
                </div>
            )}

            {role === 'C' && (
                <section className="add-fish-section">
                    <button className="toggle-add-fish-button" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Huy thêm' : 'Thêm cá mới'}
                    </button>
                    {showAddForm && (
                        <section className="add-fish-form">
                            <form onSubmit={handleAddFish}>
                                <section className="form-col">
                                    <div>
                                        <label>Trọng lượng (kg):</label>
                                        <input type="number" name="weight" value={newFish.weight} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <label>Độ dài (cm):</label>
                                        <input type="number" name="length" value={newFish.length} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <label>Tháng tuổi:</label>
                                        <input type="number" name="month" value={newFish.month} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <label>Mô tả:</label>
                                        <input type="text" name="describe" value={newFish.describe} onChange={handleInputChange} required />
                                    </div>
                                </section>
                                <button type="submit" className="submit-button">Submit</button>
                            </form>
                        </section>
                    )}
                </section>
            )}
        </section>
    );
};

export default FishTable;
