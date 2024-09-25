import styled from "styled-components";
import { useGetOrdersQuery } from "../../redux/api/adminApi";
import { useEffect } from "react";
import { Spin } from "antd";

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(orders);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess]);
  return (
    <Style>
      <h2>Orders</h2>
      {isLoading ? (
        <Spin />
      ) : isSuccess ? (
        <ol>
          {orders.map((order, i) => (
            <li key={i} className="order-list">
              <ul>
                {Object.keys(order).map((key) => (
                  <li key={key}>{`${key}: ${order[key]}`}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      ) : (
        <p>Server is down :(</p>
      )}
    </Style>
  );
};

export default Orders;

const Style = styled.div`
  h2 {
    text-align: center;
  }
  .order-list {
    border: 1px solid purple;
  }
`;
