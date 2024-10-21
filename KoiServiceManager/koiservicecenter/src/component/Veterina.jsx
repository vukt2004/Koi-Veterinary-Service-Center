import { fetchVeterinas } from '../config/api.jsx';
import { useEffect, useState } from 'react';

const Veterina = () => {
    const [veterinas, setVeterinas] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const veterinasData = await fetchVeterinas();
                setVeterinas(veterinasData);
            } catch (error) {
                console.error("Error fetching veterinas:", error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <h1>Danh Sách Bác Sĩ Thú Y</h1>

            <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Tên bác sĩ</th>
                        <th>Mô Tả</th>
                    </tr>
                </thead>
                <tbody>
                    {veterinas.length > 0 ? (
                        veterinas.filter(vet => vet.status).map((veterina) => (
                            <tr key={veterina.veterinaID}>
                                <td>{veterina.name}</td>
                                <td>{veterina.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Không có bác sĩ nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Veterina;
