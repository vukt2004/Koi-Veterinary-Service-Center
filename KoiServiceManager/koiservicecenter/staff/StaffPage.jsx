import React, { useState } from 'react';
import QuanLyDichVuCaKoi from './ServiceManagement'; 
import QuanLyDonHang from './OrdersManagement';

const StaffPage = () => {
    const [activePage, setActivePage] = useState('services');

    // Xử lý chuyển tiếp giữa các phần
    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <button onClick={() => handlePageChange('services')} style={{ padding: '10px 20px' }}>
                    Quản Lý Dịch Vụ
                </button>
                <button onClick={() => handlePageChange('orders')} style={{ padding: '10px 20px' }}>
                    Quản Lý Đơn Hàng
                </button>
            </div>

            {/* Nội dung sẽ hiển thị dựa trên trang hiện tại */}
            {activePage === 'services' && <QuanLyDichVuCaKoi />}
            {activePage === 'orders' && <QuanLyDonHang />}
        </div>
    );
}

export default StaffPage;

