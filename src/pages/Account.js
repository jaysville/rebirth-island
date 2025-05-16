import styled from "styled-components";
import { useGetOrderHistoryQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { TableContainer } from "@mui/material";
import { AltBtn } from "../components/ui/Buttons";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "./admin/OrderDetails";

const Account = () => {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.app.user.email);
  const {
    data: orders,
    isLoading,

    isSuccess,
  } = useGetOrderHistoryQuery(userEmail);
  return (
    <Style>
      <h3>Account</h3>

      <h4>Order History</h4>
      {isLoading ? (
        <span>Loading...</span>
      ) : isSuccess ? (
        orders.length > 0 ? (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>

                  <th>Order Date</th>
                  <th>Status</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td data-label="Order ID">{order._id}</td>

                      <td data-label="Order Date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <OrderStatus data-label="Status" status={order.status}>
                        {order.status}
                      </OrderStatus>
                      <td data-label="Total Amount">
                        ₦{order.totalAmount.toLocaleString("en-US")}
                      </td>
                      <td data-label="Actions" className="button-container">
                        <AltBtn
                          onClick={() => {
                            navigate(`/order/${order._id}`);
                          }}
                        >
                          View Details
                        </AltBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableContainer>
        ) : (
          <p>No Orders yet</p>
        )
      ) : (
        <p>Server is down :(</p>
      )}
    </Style>
  );
};
export default Account;

const OrderStatus = styled.td`
  color: ${({ status }) => getStatusColor(status)};
`;

const Style = styled.div`
  padding: 0 100px;
  margin-bottom: 200px;

  h4 {
    text-align: center;
    font-size: 20px;
    color: #a55fa5;
  }
  p {
    text-align: center;
    margin-top: 30px;
    font-size: 20px;
    font-weight: 500;
  }

  .button-container {
    display: flex;
    gap: 10px;
    @media (max-width: 460px) {
      flex-direction: column;
    }
  }
  button {
    border-radius: 0;
    width: 105px;
    padding: 10px;
    height: fit-content;
    cursor: pointer;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  thead {
    background-color: #f2f2f2;
  }

  @media (max-width: 860px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      display: none;
    }

    tr {
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }

    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 42%;
    }

    td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      content: attr(data-label);
      color: black;
      font-weight: bold;
    }
  }
`;
