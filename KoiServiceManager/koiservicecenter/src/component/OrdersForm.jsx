//import {useState, useEffect}  from 'react';
//import { useForm, Controller } from 'react-hook-form';
//import axios from 'axios';
//import dayjs from 'dayjs';

//const OrderForm = () => {
//    const { control, handleSubmit, setValue } = useForm();
//    const [services, setServices] = useState([]); // List các dịch vụ
//    const [selectedServices, setSelectedServices] = useState([]); // Dịch vụ đã chọn
//    const [slots, setSlots] = useState([]); // Các slot lịch từ hệ thống
//    const [veterinas, setVeterinas] = useState([]); // List Veterina từ API
//    const [currentAddress, setCurrentAddress] = useState(''); // Địa chỉ hiện tại
//    const [isAddressAutoFilled, setIsAddressAutoFilled] = useState(false); // Tình trạng auto địa chỉ

//    // Danh sách quận/huyện cố định
    //const districts = [
    //    'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9',
    //    'Quận 10', 'Quận 11', 'Quận 12', 'Quận Phú Nhuận', 'Quận Bình Thạnh', 'Quận Gò Vấp',
    //    'Quận Tân Bình', 'Quận Bình Tân', 'Quận Tân Phú', 'Quận Thủ Đức', 'Huyện Bình Chánh',
    //    'Huyện Hóc Môn', 'Huyện Củ Chi', 'Huyện Cần Giờ', 'Huyện Nhà Bè'
    //];

//    useEffect(() => {
//        // Fetch services và Veterina từ API khi component được mount
//        axios.get('/api/services').then((res) => setServices(res.data));
//        axios.get('/api/veterinas').then((res) => setVeterinas(res.data));

//        // Lấy địa chỉ từ localStorage nếu có
//        const storedAddress = localStorage.getItem('userAddress');
//        if (storedAddress) {
//            setCurrentAddress(storedAddress);
//            setIsAddressAutoFilled(true);
//        }

//        // Generate slots từ ngày hiện tại đến 7 ngày sau
//        const today = dayjs();
//        const weekSlots = [];
//        for (let i = 0; i < 7; i++) {
//            const day = today.add(i, 'day');
//            for (let slot = 1; slot <= 8; slot++) {
//                weekSlots.push({ day: day.format('YYYY-MM-DD'), slot });
//            }
//        }
//        setSlots(weekSlots);
//    }, []);

//    const onSubmit = (data) => {
//        // Lưu VeterinaId vào localStorage
//        localStorage.setItem('selectedVeterinaId', data.veterinaId);

//        // Gửi form data về server
//        axios.post('/api/orders', data)
//            .then(response => {
//                console.log('Order success:', response.data);
//            })
//            .catch(error => {
//                console.error('Order failed:', error);
//            });
//    };

//    const handleSelectService = (service) => {
//        if (!selectedServices.includes(service)) {
//            setSelectedServices([...selectedServices, service]);
//        }
//    };

//    const handleRemoveService = (service) => {
//        setSelectedServices(selectedServices.filter(s => s !== service));
//    };

//    return (
//        <form onSubmit={handleSubmit(onSubmit)}>
//            {/* Select Services */}
//            <div>
//                <label>Select Service</label>
//                <select onChange={(e) => handleSelectService(e.target.value)}>
//                    <option value="">Select a service</option>
//                    {services.map((service) => (
//                        <option key={service.id} value={service.id}>
//                            {service.name}
//                        </option>
//                    ))}
//                </select>
//                <ul>
//                    {selectedServices.map((service) => (
//                        <li key={service}>
//                            {services.find(s => s.id === service)?.name}
//                            <button type="button" onClick={() => handleRemoveService(service)}>
//                                Remove
//                            </button>
//                        </li>
//                    ))}
//                </ul>
//            </div>

//            {/* Select Slot */}
//            <div>
//                <label>Select Slot</label>
//                <table>
//                    <thead>
//                        <tr>
//                            <th>Date</th>
//                            <th>Slot</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {slots.map((slot) => (
//                            <tr key={`${slot.day}-${slot.slot}`}>
//                                <td>{slot.day}</td>
//                                <td>
//                                    <button
//                                        type="button"
//                                        onClick={() => setValue('selectedSlot', slot)}
//                                    >
//                                        Slot {slot.slot}
//                                    </button>
//                                </td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </table>
//            </div>

//            {/* Select Veterina */}
//            <div>
//                <label>Select Veterina</label>
//                <Controller
//                    name="veterinaId"
//                    control={control}
//                    render={({ field }) => (
//                        <select {...field}>
//                            <option value="">Select a Veterina</option>
//                            {veterinas.map((veterina) => (
//                                <option key={veterina.id} value={veterina.id}>
//                                    {veterina.name}
//                                </option>
//                            ))}
//                        </select>
//                    )}
//                />
//            </div>

//            {/* Select District */}
//            <div>
//                <label>Select District</label>
//                <Controller
//                    name="district"
//                    control={control}
//                    render={({ field }) => (
//                        <select {...field} disabled={isAddressAutoFilled}>
//                            <option value="">Select a District</option>
//                            {districts.map((district, index) => (
//                                <option key={index} value={district}>
//                                    {district}
//                                </option>
//                            ))}
//                        </select>
//                    )}
//                />
//            </div>

//            {/* Address */}
//            <div>
//                <label>Address</label>
//                <input
//                    type="text"
//                    value={currentAddress}
//                    onChange={(e) => setCurrentAddress(e.target.value)}
//                    disabled={isAddressAutoFilled}
//                />
//                <button type="button" onClick={getCurrentLocation}>
//                    Lấy địa chỉ của tôi
//                </button>
//            </div>

//            {/* Submit Order */}
//            <button type="submit">Order</button>
//        </form>
//    );
//};

//export default OrderForm;
