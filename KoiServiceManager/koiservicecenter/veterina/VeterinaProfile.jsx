import { useEffect, useState } from 'react';
import { getUserId } from '../src/utils/utils.jsx';
import { fetchUserID, fetchVeterinas, getFeedbackByVeterinaId } from '../src/config/api.jsx';
import { useParams } from 'react-router-dom';
import './VeterinaProfile.css';

const Profile = () => {
    const { veterinaID } = useParams();
    const [veterina, setVeterina] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [user, setUser] = useState(null);
    const [loggedRole, setLoggedRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        setLoggedRole(role);

        const loadData = async () => {
            try {
                if (role === 'V') {
                    const userId = getUserId();
                    const userData = await fetchUserID(userId);
                    setUser(userData);
                }

                const veterinasData = await fetchVeterinas();
                const veterinaData = veterinasData.find(vet => vet.veterinaID === veterinaID);
                setVeterina(veterinaData);

                const feedBacksData = await getFeedbackByVeterinaId(veterinaID);
                setFeedbacks(feedBacksData);
            } catch (error) {
                console.error('Error loading data', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [veterinaID, loggedRole]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Hồ sơ bác sĩ</h2>

            {loggedRole === 'V' && user && (
                <>
                    <p><b>Id Người dùng: </b> {user.userID}</p>
                    <p><b>Tên: </b> {user.name}</p>
                    <p><b>Email: </b> {user.email}</p>
                    <p><b>Số điện thoại: </b> {user.phoneNumber}</p>
                    <p><b>Role: </b> {user.role}</p>
                    <p><b>Địa chỉ đăng kí: </b> {user.address}</p>
                </>
            )}

            {veterina && <p><b>Giới thiệu: </b>{veterina.description}</p>}

            <h2>Đánh giá</h2>
            {feedbacks ? (
                feedbacks.length === 0 ? (
                    <p>Không có đánh giá nào</p>
                ) : (
                    feedbacks.map(f => {
                        const feedbackDate = new Date(f.feedbackDateTime).toLocaleString('vi-VN');
                        const stars = '⭐'.repeat(f.rating); // Generate stars based on rating
                        return (
                            <article key={f.feedbackId} className="feedback">
                                <p>Ngày: {feedbackDate}</p>
                                <p>Đánh giá: {stars}</p>
                                <p>Bình luận: {f.comment}</p>
                            </article>
                        );
                    })
                )
            ) : (
                <p>Không có đánh giá nào</p>
            )}
        </div>
    );
};

export default Profile;
