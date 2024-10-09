import React, { useEffect, useState } from 'react';
import { fetchServices, addService, updateService, deleteService } from '../src/config/api.jsx';

const QuanLyDichVuCaKoi = () => {
    const [dichVu, setDichVu] = useState([]);
    const [dichVuMoi, setDichVuMoi] = useState({ name: '', type: '', price: '' });
    const [dichVuDangChinhSua, setDichVuDangChinhSua] = useState(null);

    useEffect(() => {
        const loadServices = async () => {
            const services = await fetchServices();
            setDichVu(services);
        };
        loadServices();
    }, []);

    const handleThemDichVu = async () => {
        const newService = { ...dichVuMoi, price: parseFloat(dichVuMoi.price) };
        const createdService = await addService(newService);
        setDichVu([...dichVu, createdService]);
        setDichVuMoi({ name: '', type: '', price: '' });
    };

    const handleCapNhatDichVu = async () => {
        const updatedService = await updateService(dichVuDangChinhSua.serviceID, dichVuDangChinhSua);
        const updatedServices = dichVu.map((dv) =>
            dv.serviceID === dichVuDangChinhSua.serviceID ? updatedService : dv
        );
        setDichVu(updatedServices);
        setDichVuDangChinhSua(null);
    };

    const handleXoaDichVu = async (serviceID) => {
        await deleteService(serviceID);
        const filteredServices = dichVu.filter((dv) => dv.serviceID !== serviceID);
        setDichVu(filteredServices);
    };

    return (
        <div>
            <h1>Quản Lý Dịch Vụ Cá Koi</h1>

            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Mã Dịch Vụ</th>
                        <th>Tên Dịch Vụ</th>
                        <th>Loại</th>
                        <th>Giá (VND)</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {dichVu.map((dv) => (
                        <tr key={dv.serviceID}>
                            <td>{dv.serviceID}</td>
                            <td>{dv.name}</td>
                            <td>{dv.type}</td>
                            <td>{dv.price.toLocaleString('vi-VN')} VND</td>
                            <td>
                                <button onClick={() => setDichVuDangChinhSua(dv)}>Sửa</button>
                                <button onClick={() => handleXoaDichVu(dv.serviceID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Thêm Dịch Vụ Mới</h2>
            <input
                type="text"
                placeholder="Tên Dịch Vụ"
                value={dichVuMoi.name}
                onChange={(e) => setDichVuMoi({ ...dichVuMoi, name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Loại"
                value={dichVuMoi.type}
                onChange={(e) => setDichVuMoi({ ...dichVuMoi, type: e.target.value })}
            />
            <input
                type="number"
                placeholder="Giá (VND)"
                value={dichVuMoi.price}
                onChange={(e) => setDichVuMoi({ ...dichVuMoi, price: e.target.value })}
            />
            <button onClick={handleThemDichVu}>Thêm Dịch Vụ</button>

            {dichVuDangChinhSua && (
                <div>
                    <h2>Sửa Dịch Vụ</h2>
                    <input
                        type="text"
                        value={dichVuDangChinhSua.name}
                        onChange={(e) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={dichVuDangChinhSua.type}
                        onChange={(e) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, type: e.target.value })}
                    />
                    <input
                        type="number"
                        value={dichVuDangChinhSua.price}
                        onChange={(e) => setDichVuDangChinhSua({ ...dichVuDangChinhSua, price: parseFloat(e.target.value) })}
                    />
                    <button onClick={handleCapNhatDichVu}>Cập Nhật Dịch Vụ</button>
                    <button onClick={() => setDichVuDangChinhSua(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default QuanLyDichVuCaKoi;
