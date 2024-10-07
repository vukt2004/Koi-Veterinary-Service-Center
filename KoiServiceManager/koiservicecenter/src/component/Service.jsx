import React, { useState } from 'react';

const danhSachDichVuCaKoi = [
    { serviceID: 'S001', name: 'Kiểm tra sức khỏe cá Koi', type: 'Y tế', price: 30.0 },
    { serviceID: 'S002', name: 'Chăm sóc lông vây', type: 'Thẩm mỹ', price: 45.0 },
    { serviceID: 'S003', name: 'Điều trị bệnh ký sinh trùng', type: 'Y tế', price: 60.0 },
    { serviceID: 'S004', name: 'Điều trị bệnh nấm', type: 'Y tế', price: 55.0 },
    { serviceID: 'S005', name: 'Thiết lập hồ cá', type: 'Thiết lập hồ', price: 150.0 },
    { serviceID: 'S006', name: 'Thiết kế hồ cá Koi', type: 'Thiết lập hồ', price: 500.0 },
    { serviceID: 'S007', name: 'Thay nước và làm sạch hồ', type: 'Bảo dưỡng', price: 100.0 },
    { serviceID: 'S008', name: 'Tư vấn dinh dưỡng cho cá Koi', type: 'Dinh dưỡng', price: 25.0 },
];

const XemDichVuCaKoi = () => {
    const [dichVu] = useState(danhSachDichVuCaKoi);

    return (
        <div>
            <h1>Dịch Vụ Dành Cho Cá Koi</h1>
            <table border="1" style={{ marginTop: '20px', width: '50%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Tên Dịch Vụ</th>
                        <th>Loại</th>
                        <th>Giá (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {dichVu.map((dichVu) => (
                        <tr key={dichVu.serviceID}>
                            <td>{dichVu.name}</td>
                            <td>{dichVu.type}</td>
                            <td>{dichVu.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default XemDichVuCaKoi;
