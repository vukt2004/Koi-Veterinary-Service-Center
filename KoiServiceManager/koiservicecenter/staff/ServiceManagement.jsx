import React, { useState } from 'react';

const danhSachDichVuCaKoi = [
    { serviceID: 'S001', name: 'Kiểm tra sức khỏe cá Koi', type: 'Y tế', price: 700000 },
    { serviceID: 'S002', name: 'Chăm sóc lông vây', type: 'Thẩm mỹ', price: 1050000 },
    { serviceID: 'S003', name: 'Điều trị bệnh ký sinh trùng', type: 'Y tế', price: 1400000 },
    { serviceID: 'S004', name: 'Điều trị bệnh nấm', type: 'Y tế', price: 1200000 },
    { serviceID: 'S005', name: 'Thiết lập hồ cá', type: 'Thiết lập hồ', price: 3500000 },
    { serviceID: 'S006', name: 'Thiết kế hồ cá Koi', type: 'Thiết lập hồ', price: 12000000 },
    { serviceID: 'S007', name: 'Thay nước và làm sạch hồ', type: 'Bảo dưỡng', price: 2300000 },
    { serviceID: 'S008', name: 'Tư vấn dinh dưỡng cho cá Koi', type: 'Dinh dưỡng', price: 580000 },
];

const QuanLyDichVuCaKoi = () => {
    const [dichVu, setDichVu] = useState(danhSachDichVuCaKoi); // Dữ liệu dịch vụ
    const [dichVuMoi, setDichVuMoi] = useState({ name: '', type: '', price: '' }); // Dịch vụ mới
    const [dichVuDangChinhSua, setDichVuDangChinhSua] = useState(null); // Dịch vụ đang chỉnh sửa

    const handleThemDichVu = () => {
        const newID = `S00${dichVu.length + 1}`;
        setDichVu([...dichVu, { ...dichVuMoi, serviceID: newID, price: parseFloat(dichVuMoi.price) }]);
        setDichVuMoi({ serviceID:'', name: '', type: '', price: '' });
    };

    const handleCapNhatDichVu = () => {
        const updatedServices = dichVu.map((dv) =>
            dv.serviceID === dichVuDangChinhSua.serviceID ? dichVuDangChinhSua : dv
        );
        setDichVu(updatedServices);
        setDichVuDangChinhSua(null);
    };

    const handleXoaDichVu = (serviceID) => {
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
                placeholder="ID Dịch Vụ"
                value={dichVuMoi.serviceID}
                onChange={(e) => setDichVuMoi({ ...dichVuMoi, name: e.target.value })}
            />
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
