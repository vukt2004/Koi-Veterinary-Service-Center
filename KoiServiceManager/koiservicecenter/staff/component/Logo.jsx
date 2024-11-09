import { CustomerServiceOutlined } from "@ant-design/icons";
import { getUserId } from "../../src/utils/utils";
import { fetchUserID } from "../../src/config/api";
import { useState, useEffect } from "react";
const Logo = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () =>{
      const userID = getUserId();
      const userData = await fetchUserID(userID);
      setUser(userData);
    }
    getData()
  }, [])

  return (
    <div className="logo">
      <div className="logo-icon">
        <CustomerServiceOutlined />
      </div>
      <div>
        <h3>Chào mừng, {user.name}</h3>
      </div>
    </div>
  );
};

export default Logo;
