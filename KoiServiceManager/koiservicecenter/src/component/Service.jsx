import { useEffect, useState } from 'react';
import { fetchServices } from '../config/api.jsx';
import './css/Service.css'

const CustomerServices = () => {
    const [dichVu, setDichVu] = useState([]);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const services = await fetchServices();
                setDichVu(services);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        loadServices();
    }, []);

    return (
        <div className="service-container">
            <h1 className="service-title">Dịch Vụ Cá Koi</h1>
            {dichVu.length > 0 ? (
                <>
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Tên Dịch Vụ</th>
                                <th>Loại</th>
                                <th>Giá (VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dichVu.map((dv) => (
                                <tr key={dv.serviceID}>
                                    <td>{dv.name}</td>
                                    <td>{dv.type} {dv.service ? '' : '*'}</td>
                                    <td>{dv.price.toLocaleString('vi-VN')} VND</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br></br>
                    <h3>Dịch vụ đánh dấu * cần bác sĩ chỉ định</h3>
                </>
                
            ) : (
                <h2>Hiện tại không có dịch vụ nào.</h2>
            )}
        </div>
    );
};

export default CustomerServices;
