import { fetchVeterinas } from "../config/api.jsx";
import { useEffect, useState } from "react";
import "./css/Veterina.css";
import { useNavigate } from "react-router-dom";

const Veterina = () => {
  const [veterinas, setVeterinas] = useState([]);
  const navigate = useNavigate();

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

  const handleNavigate = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
      <div className={"veterinaContainer"}>
        <h1 className={"veterinaLabel"}>Danh Sách Bác Sĩ Thú Y</h1>

        <div className={"cardContainer"}>
          {veterinas.length > 0 ? (
            veterinas
              .filter((vet) => vet.status)
              .map((veterina) => (
                <div key={veterina.veterinaID} className={"card"}>
                  <div className={"cardImage"}>
                    <img
                      src={
                        "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/18/457/avatar-mac-dinh-12.jpg"
                      }
                      alt={veterina.name}
                      className={"doctorImage"}
                      onError={(e) => {
                        e.target.src = "/default-doctor.png";
                      }}
                    />
                  </div>
                  <div className={"cardHeader"}>
                    <h2 className={"doctorName"}>{veterina.name}</h2>
                  </div>
                  <div className={"cardBody"}>
                    <p className={"description"}>{veterina.description}</p>
                  </div>
                  <div className="viewVeterinaProfile">
                    <button className="Vet-profile">View Profile</button>
                  </div>
                </div>
              ))
          ) : (
            <div className={"noDoctor"}>Không có bác sĩ nào.</div>
          )}
        </div>
      </div>

  );
};

export default Veterina;
