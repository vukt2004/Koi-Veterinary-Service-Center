import { useEffect, useState } from "react";
import {
  fetchOrders,
  fetchVeterinas,
  addOrderVeterina,
  fetchServices,
  updateOrderStatus,
} from "../src/config/api.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [veterinas, setVeterinas] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [services, setServices] = useState([]);

  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(sessionStorage.getItem("currentPage")) || 1;
  });

  const [currentStatus, setCurrentStatus] = useState(() => {
    return sessionStorage.getItem("currentStatus") || "pending";
  });

  const ordersPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await fetchOrders();
      const veterinasData = await fetchVeterinas();
      const servicesData = await fetchServices();
      setServices(servicesData);
      setOrders(ordersData);
      setVeterinas(veterinasData.filter((vet) => vet.status === true));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      filterOrdersByStatus("pending");
    }
  }, [orders]);

  const filterOrdersByStatus = (status) => {
    const filtered = orders.filter((order) => order.status === status);
    setFilteredOrders(filtered);
    setCurrentPage(1);
    setCurrentStatus(status);
    sessionStorage.setItem("currentStatus", status);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    sessionStorage.setItem("currentPage", pageNumber);
  };

  const getServiceNameById = (serviceID) => {
    const service = services.find((s) => s.serviceID === serviceID);
    return service ? service.name : serviceID;
  };

  const isVeterinaAvailable = (veterinaId, orderDate, orderSlot) => {
    const veterinaOrders = orders.filter(
      (order) =>
        order.veterinaId === veterinaId &&
        order.orderDate === orderDate &&
        order.slot === orderSlot
    );
    return veterinaOrders.length === 0;
  };

  const handleSelectVeterina = async (orderId, veterinaId) => {
    const response = await addOrderVeterina(orderId, veterinaId);
    if (response) {
      toast.success("Điều chỉnh bác sĩ thành công");
      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error("Điều chỉnh bác sĩ thất bại");
    }
  };

  const handleCancel = async (orderID) => {
    const response = await updateOrderStatus(orderID, "cancel");
    if (response) {
      toast.success("Hủy đơn thành công");
      setTimeout(() => window.location.reload(), 2000);
    } else {
      toast.error("Hủy đơn thất bại");
    }
  };

  const sortedOrders = filteredOrders
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .sort((a) => (a.veterinaId === null ? -1 : 1));

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const renderPagination = () => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <span
          key="prev"
          onClick={() => paginate(currentPage - 1)}
          className="pagination-item"
        >
          « Trước
        </span>
      );
    }

    pages.push(
      <span key="1" onClick={() => paginate(1)} className="pagination-item">
        1
      </span>
    );

    if (currentPage > 3) {
      pages.push(
        <span key="start-ellipsis" className="pagination-item">
          ...
        </span>
      );
    }

    if (currentPage > 1 && currentPage < totalPages) {
      pages.push(
        <span key="current" className="pagination-item current-page">
          {currentPage}
        </span>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="end-ellipsis" className="pagination-item">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <span
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className="pagination-item"
        >
          {totalPages}
        </span>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <span
          key="next"
          onClick={() => paginate(currentPage + 1)}
          className="pagination-item"
        >
          Sau »
        </span>
      );
    }

    return <div className="pagination">{pages}</div>;
  };

  const getVeterinaName = (veterinaId) => {
    const veterina = veterinas.find((vet) => vet.veterinaID === veterinaId);
    return veterina ? veterina.name : "Unknown Veterina";
  };

  return (
    <div className="order-management">
      <div className="container">
        <h1 className="dashboard-title">Quản Lý Đơn Đặt Lịch</h1>
        <ToastContainer />

        <div className="filter-buttons">
          <button
            className={`filter-btn ${
              currentStatus === "pending" ? "active" : ""
            }`}
            onClick={() => filterOrdersByStatus("pending")}
          >
            Chờ Xử Lý
          </button>
          <button
            className={`filter-btn ${
              currentStatus === "accept" ? "active" : ""
            }`}
            onClick={() => filterOrdersByStatus("accept")}
          >
            Đã Chấp Nhận
          </button>
          <button
            className={`filter-btn ${currentStatus === "done" ? "active" : ""}`}
            onClick={() => filterOrdersByStatus("done")}
          >
            Hoàn Thành
          </button>
          <button
            className={`filter-btn ${
              currentStatus === "cancel" ? "active" : ""
            }`}
            onClick={() => filterOrdersByStatus("cancel")}
          >
            Đã Hủy
          </button>
        </div>

        <div className="table-responsive">
          <table className="order-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Mã Khách Hàng</th>
                <th>Bác Sĩ</th>
                <th>Ngày</th>
                <th>Ca</th>
                <th>Địa Chỉ</th>
                <th>Dịch Vụ</th>
                <th>Ghi Chú</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.orderId}>
                  <td data-label="Mã Đơn">{order.orderId}</td>
                  <td data-label="Mã Khách Hàng">{order.userId}</td>
                  <td data-label="Bác Sĩ">
                    {order.status === "cancel" || order.status === "done" ? (
                      <span className="vet-name">
                        {veterinas.find(
                          (vet) => vet.veterinaID === order.veterinaId
                        )?.name || "Unknown"}
                      </span>
                    ) : (
                      <select
                        onChange={(e) =>
                          handleSelectVeterina(order.orderId, e.target.value)
                        }
                        className="veterina-select"
                        value={order.veterinaId || ""}
                      >
                        <option
                          value={
                            order.veterinaId !== null ? order.veterinaId : ""
                          }
                        >
                          {order.veterinaId
                            ? getVeterinaName(order.veterinaId)
                            : "Chọn bác sĩ"}
                        </option>
                        {veterinas
                          .filter((vet) =>
                            isVeterinaAvailable(
                              vet.veterinaID,
                              order.orderDate,
                              order.slot
                            )
                          )
                          .map((vet) => (
                            <option key={vet.veterinaID} value={vet.veterinaID}>
                              {vet.name}
                            </option>
                          ))}
                      </select>
                    )}
                  </td>
                  <td data-label="Ngày">{order.orderDate}</td>
                  <td data-label="Ca">{order.slot}</td>
                  <td data-label="Địa Chỉ" className="address-cell">
                    {order.address}
                  </td>
                  <td data-label="Dịch Vụ" className="services-cell">
                    {order.services.map((service) => (
                      <div key={service.serviceID} className="service-tag">
                        {getServiceNameById(service.serviceID)}
                        <span className="service-quantity">
                          ×{service.quantity}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td data-label="Ghi Chú" className="notes-cell">
                    {order.description}
                  </td>
                  <td data-label="Thao Tác">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancel(order.orderId)}
                        className="cancel-button"
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">{renderPagination()}</div>
      </div>

      <style jsx>{`
        .order-management {
          min-height: 100vh;
          background: #f5f7fa;
          padding: 2rem 1rem;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-title {
          color: #2c3e50;
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .filter-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          background: #fff;
          color: #666;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .filter-btn.active {
          background: #4caf50;
          color: white;
        }

        .table-responsive {
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .order-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.9rem;
        }

        .order-table th {
          background: #f8f9fa;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #2c3e50;
          border-bottom: 2px solid #eee;
        }

        .order-table td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          color: #555;
        }

        .order-table tr:hover {
          background: #f8f9fa;
        }

        .veterina-select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          background: white;
          cursor: pointer;
        }

        .service-tag {
          display: inline-block;
          background: #e8f5e9;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          margin: 0.25rem;
          font-size: 0.85rem;
          color: #2e7d32;
        }

        .service-quantity {
          margin-left: 0.5rem;
          font-weight: 600;
        }

        .cancel-button {
          padding: 0.5rem 1rem;
          background: #ff5252;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
          width: 60px;
        }

        .cancel-button:hover {
          background: #ff1744;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .pagination-item {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .pagination-item:hover {
          background: #4caf50;
          color: white;
        }

        .current-page {
          background: #4caf50;
          color: white;
        }

        .address-cell,
        .notes-cell {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 1024px) {
          .order-table {
            font-size: 0.85rem;
          }

          .service-tag {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 1.5rem;
          }

          .order-table thead {
            display: none;
          }

          .order-table tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 1rem;
          }

          .order-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            padding: 0.5rem 0;
          }

          .order-table td::before {
            content: attr(data-label);
            font-weight: 600;
            margin-right: 1rem;
          }

          .address-cell,
          .notes-cell {
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderManagement;
