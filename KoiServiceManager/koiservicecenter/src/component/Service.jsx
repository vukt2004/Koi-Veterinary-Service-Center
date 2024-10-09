import React, { useEffect, useState } from 'react';
import { fetchServices} from '../config/api.jsx';

const QuanLyDichVuCaKoi = () => {
    const [dichVu, setDichVu] = useState([]);

    useEffect(() => {
        const loadServices = async () => {
            const services = await fetchServices();
            setDichVu(services);
        };
        loadServices();
    }, []);

    return (
        <div>
            <h1>Quản Lý Dịch Vụ Cá Koi</h1>

            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
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
                            <td>{dv.type}</td>
                            <td>{dv.price.toLocaleString('vi-VN')} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuanLyDichVuCaKoi;
