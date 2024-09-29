import styled from "styled-components";
import { useGetSingleOrderQuery } from "../../redux/api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { VolumeUp } from "@mui/icons-material";
import { notification } from "antd";

const OrderDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { orderId } = params;

  const {
    data: order,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleOrderQuery(orderId);

  useEffect(() => {
    if (isSuccess) {
    }
    console.log(order);
    if (isError) {
      notification.error({
        message: error.data.message,
        duration: 5,
        placement: "bottomRightt",
      });
      navigate("/");
    }
  }, [isError, error]);

  return (
    <Container>
      {isLoading ? (
        "Loading...."
      ) : isSuccess ? (
        <>
          <Title>Order #{orderId}</Title>
          <Section>
            <Label>Order Status</Label>
            <Value status={order.status}>{order.status}</Value>
          </Section>
          <Section>
            <Label>Full Name:</Label>
            <Value>{order.fullName}</Value>
          </Section>
          <Section>
            <Label>Email:</Label>
            <Value>{order.email}</Value>
          </Section>
          <Section>
            <Label>Phone:</Label>
            <Value>{order.phone}</Value>
          </Section>
          <Section>
            <Label>Address:</Label>
            <Value>
              {order.address}, {order.city}, {order.state}
            </Value>
          </Section>
          <Section>
            <Label>Landmark:</Label>
            <Value>{order.landmark}</Value>
          </Section>
          <Section>
            <Label>Total Amount:</Label>
            <Value>₦{order.totalAmount}</Value>
          </Section>
          <Section>
            <Label>Products:</Label>
            <ProductList>
              {order.products.map((product) => (
                <ProductItem key={product._id}>
                  <div>
                    <ProductName>{product.name}</ProductName>
                    <ProductDetail>Price:₦{product.price}</ProductDetail>
                    <ProductDetail>Size: {product.size}</ProductDetail>
                    <ProductDetail>Quantity: {product.quantity}</ProductDetail>
                  </div>

                  <img src={product.image} alt="merch" />
                </ProductItem>
              ))}
            </ProductList>
          </Section>
        </>
      ) : (
        <p>Something went wrong</p>
      )}
    </Container>
  );
};

export default OrderDetails;

export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "Orange";
    case "Shipped":
      return "blue";
    case "Delivered":
      return "green";
    default:
      return "black"; // default color if status doesn't match any case
  }
};

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 10px;
  color: ${({ status }) => getStatusColor(status)};
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  img {
    width: 70px;
    border-radius: 10px;
  }
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductDetail = styled.div`
  margin-top: 5px;
  color: #555;
`;
