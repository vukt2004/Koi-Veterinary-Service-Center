import { useEffect, useState } from 'react';
import { fetchServices } from '../config/api.jsx';
import './css/Service.css'

const CustomerServices = () => {
    const [dichVu, setDichVu] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredServices = dichVu.filter(dv =>
        dv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dv.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="service-container">
            <h1 className="service-title">Dịch Vụ Cá Koi</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm dịch vụ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
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
                            {filteredServices.map((dv) => (
                                <tr key={dv.serviceID}>
                                    <td>{dv.name}</td>
                                    <td>{dv.type} {dv.service ? '' : '*'}</td>
                                    <td>{dv.price.toLocaleString('vi-VN')} VND</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br></br>
                    <h3 className="note">Dịch vụ đánh dấu * cần bác sĩ chỉ định</h3>
                </>
            ) : (
                <h2>Hiện tại không có dịch vụ nào.</h2>
            )}
        </div>
    );
};

export default CustomerServices;
