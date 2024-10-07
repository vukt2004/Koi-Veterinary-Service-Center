import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

// Giả lập Fake User với nhiều thông tin chi tiết
const fakeUser = {
    userID: '1234567890',
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    gender: 'male',
    birthDate: '1990-01-01',
    email: 'nguyenvana@example.com',
    phoneNumber: '0909123456',
    address: {
        street: '123 Đường ABC',
        district: 'Quận 1',
        city: 'TP.HCM',
        country: 'Vietnam',
        postalCode: '700000'
    },
    membership: {
        type: 'Gold',
        expiryDate: '2025-12-31'
    }
};

const OrderForm = () => {
    const { control, handleSubmit, setValue } = useForm();
    const [selectedServices, setSelectedServices] = useState([]); // Danh sách dịch vụ đã chọn
    const [slots, setSlots] = useState([]); // Các slot lịch
    const [currentAddress, setCurrentAddress] = useState(''); // Địa chỉ hiện tại
    const [useMyAddress, setUseMyAddress] = useState(false); // Trạng thái toggle Yes/No
    const [selectedSlot, setSelectedSlot] = useState(null); // Slot được chọn gần nhất
    const [status] = useState('pending'); // Giả lập trạng thái

    // Dữ liệu giả lập cho dịch vụ
    const services = [
        { id: '1', name: 'Vaccination' },
        { id: '2', name: 'General Checkup' },
        { id: '3', name: 'Dental Care' },
        { id: '4', name: 'Surgery' }
    ];

    // Dữ liệu giả lập cho Veterina
    const veterinas = [
        { id: 'v1', name: 'Dr. John Doe' },
        { id: 'v2', name: 'Dr. Jane Smith' },
        { id: 'v3', name: 'Dr. Albert Wong' }
    ];

    // Danh sách quận/huyện cố định
    const districts = [
        'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9',
        'Quận 10', 'Quận 11', 'Quận 12', 'Quận Phú Nhuận', 'Quận Bình Thạnh', 'Quận Gò Vấp',
        'Quận Tân Bình', 'Quận Bình Tân', 'Quận Tân Phú', 'Quận Thủ Đức', 'Huyện Bình Chánh',
        'Huyện Hóc Môn', 'Huyện Củ Chi', 'Huyện Cần Giờ', 'Huyện Nhà Bè'
    ];

    useEffect(() => {
        const today = dayjs();
        const weekSlots = [];
        for (let i = 0; i < 9; i++) {
            const day = today.add(i, 'day');
            for (let slot = 1; slot <= 8; slot++) {
                weekSlots.push({ day: day.format('YYYY-MM-DD'), slot });
            }
        }
        setSlots(weekSlots);

        // Sử dụng địa chỉ từ `fakeUser`
        setCurrentAddress(fakeUser.address.street + ', ' + fakeUser.address.district);
    }, []);

    const onSubmit = (data) => {
        // Log thông tin gửi về
        const orderData = {
            userID: fakeUser.userID,
            services: selectedServices.map((service) => ({
                serviceId: service.id,
                quantity: service.quantity
            })),
            day: selectedSlot?.day,
            slot: selectedSlot?.slot,
            veterinaID: data.veterinaId,
            address: useMyAddress
                ? currentAddress // Sử dụng địa chỉ từ FakeUser nếu chọn "Use My Address"
                : `${currentAddress}, ${data.district}`, // Nếu không sử dụng thì gửi quận + địa chỉ chi tiết
            status
        };

        console.log('Order Data:', orderData);
    };

    const handleSelectService = (serviceId) => {
        const service = services.find((s) => s.id === serviceId);
        if (service && !selectedServices.some((s) => s.id === serviceId)) {
            setSelectedServices([...selectedServices, { ...service, quantity: 1 }]);
        }
    };

    const handleRemoveService = (serviceId) => {
        setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
    };

    const handleQuantityChange = (serviceId, quantity) => {
        setSelectedServices(
            selectedServices.map((s) =>
                s.id === serviceId ? { ...s, quantity: Number(quantity) } : s
            )
        );
    };

    const handleToggleAddress = () => {
        const nextUseMyAddress = !useMyAddress;
        setUseMyAddress(nextUseMyAddress);
        if (nextUseMyAddress) {
            setCurrentAddress(fakeUser.address.street + ', ' + fakeUser.address.district);
        } else {
            setCurrentAddress('');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Select Service */}
            <div>
                <label>Select Service</label>
                <select onChange={(e) => handleSelectService(e.target.value)}>
                    <option value="">Select a service</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
                <ul>
                    {selectedServices.map((service) => (
                        <li key={service.id}>
                            {service.name} - Quantity:
                            <input
                                type="number"
                                value={service.quantity}
                                onChange={(e) =>
                                    handleQuantityChange(service.id, e.target.value)
                                }
                                min="1"
                                style={{ margin: '0 10px' }}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveService(service.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Select Slot */}
            <div>
                <label>Select Slot</label>
                <table style={{ border: '1px solid black', borderCollapse: 'collapse', margin: '10px 0' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '5px' }}>Slot</th>
                            {Array.from({ length: 9 }, (_, i) => (
                                <th key={i} style={{ border: '1px solid black', padding: '5px' }}>
                                    {dayjs().add(i, 'day').format('DD/MM')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 8 }, (_, slotIndex) => (
                            <tr key={slotIndex}>
                                <td style={{ border: '1px solid black', padding: '5px', margin: '2px' }}>Slot {slotIndex + 1}</td>
                                {Array.from({ length: 9 }, (_, dayIndex) => (
                                    <td key={`${dayIndex}-${slotIndex}`} style={{ border: '1px solid black', padding: '5px', margin: '2px' }}>
                                        <button
                                            type="button"
                                            style={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px',
                                                cursor: 'pointer',
                                                margin: '2px'
                                            }}
                                            onClick={() => {
                                                setSelectedSlot({ day: dayjs().add(dayIndex, 'day').format('YYYY-MM-DD'), slot: slotIndex + 1 });
                                                setValue('selectedSlot', { day: dayIndex, slot: slotIndex + 1 });
                                            }}
                                        >
                                            Select
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <a>Selected: {selectedSlot?.day} slot: {selectedSlot?.slot}</a>
            </div>

            {/* Select Veterina */}
            <div>
                <label>Select Veterina</label>
                <Controller
                    name="veterinaId"
                    control={control}
                    render={({ field }) => (
                        <select {...field}>
                            <option value="">Select Veterina</option>
                            {veterinas.map((veterina) => (
                                <option key={veterina.id} value={veterina.id}>
                                    {veterina.name}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            {/* Select District */}
            <div>
                <label>Select District</label>
                <Controller
                    name="district"
                    control={control}
                    render={({ field }) => (
                        <select {...field} disabled={useMyAddress}>
                            <option value="">Select District</option>
                            {districts.map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            {/* Address */}
            <div>
                <label>Address</label>
                <input
                    type="text"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    disabled={useMyAddress}
                />
                <button type="button" onClick={handleToggleAddress}>
                    {useMyAddress ? 'Use Another Address' : 'Use My Address'}
                </button>
            </div>

            {/* Submit Order */}
            <button type="submit">Order</button>
        </form>
    );
};

export default OrderForm;
