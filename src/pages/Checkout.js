import styled from "styled-components";
import Form from "../components/ui/Form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { statesInNigeria } from "../data";
import { MainBtn } from "../components/ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "../components/ui/CheckoutItem";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { usePlaceOrderMutation } from "../redux/api/userApi";
import {
  useInitializeTransactionMutation,
  useVerifyTransactionMutation,
} from "../redux/api/adminApi";
import PaystackPop from "@paystack/inline-js";
import { useFormik, Field } from "formik";
import { orderSchema } from "../schemas";
import { ErrorText } from "./auth/Register";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/store.js/slices/appSlice";

const Checkout = ({ mobileview }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    initializeTransaction,
    { data, isLoading, isSuccess, isError, error },
  ] = useInitializeTransactionMutation();

  const [
    verifyTransaction,
    {
      isLoading: verificationLoading,
      error: verificationError,
      isError: verificationIsError,
      isSuccess: verificationIsSuccess,
    },
  ] = useVerifyTransactionMutation();

  const cart = useSelector((state) => state.app.cart);

  useEffect(() => {
    if (cart.length < 1) {
      navigate("/");
    }
  }, [cart]);
  const shippingPrice = 5000;
  const totalProductPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const netPrice = shippingPrice + totalProductPrice;

  const [showCartSummary, setShowCartSummary] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const popup = new PaystackPop();

      popup.newTransaction({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        email: "olaotanabarowei@gmail.com",
        amount: netPrice * 100,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        onSuccess: () => {
          verifyTransaction(data.data.reference);
        },
      });
    }
    if (isError) {
      notification.error({
        message: "Something went wrong",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, isError, error, data]);

  const [
    placeOrder,
    {
      isSuccess: orderSuccess,
      isError: orderIsError,
      isLoading: orderIsLoading,
    },
  ] = usePlaceOrderMutation();

  useEffect(() => {
    if (verificationIsSuccess) {
      placeOrder({
        email: values.email,
        phone: values.phone,
        address: values.address,
        firstName: values.firstName,
        lastName: values.lastName,
        landmark: values.landmark,
        city: values.city,
        state: values.state,
        products: cart.map(({ _id, name, price, images, size, quantity }) => {
          return {
            productId: _id,
            image: images[0],
            price,
            name,
            size,
            quantity,
          };
        }),
        totalAmount: netPrice,
      });
    }
    if (verificationError) {
      notification.error({
        message: "Couldn't verify product.",
        duration: 5,
        placement: "bottomRight",
      });
    }
  }, [verificationError, verificationIsError, verificationIsSuccess]);

  useEffect(() => {
    if (orderSuccess) {
      notification.success({
        message:
          "Thank you for shopping with Rebirth Island! Your order details will be emailed to you shortly.",
        duration: 6,
        placement: "bottomRight",
      });
      dispatch(clearCart());
      navigate("/");
    }
    if (orderIsError) {
      notification.error({
        message: "Something went wrong.",
        duration: 5,
        placement: "bottomRight",
      });
    }
  }, [orderSuccess, orderIsError]);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        landmark: "",
        city: "",
        state: "Lagos",
      },
      validationSchema: orderSchema,
      onSubmit: () => {
        initializeTransaction({
          key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
          email: "olaotanabarowei@gmail.com",
          amount: netPrice * 100,
        });
      },
    });

  return (
    <Style mobileview={mobileview}>
      <div>
        {mobileview && (
          <div className="order-summary">
            <div className="control">
              <span
                onClick={() => {
                  setShowCartSummary(showCartSummary ? false : true);
                }}
              >
                {showCartSummary ? "Hide " : "Show "} order summary
                {!showCartSummary && <DownOutlined />}
                {showCartSummary && <UpOutlined />}
              </span>
              <span className="total">₦{netPrice}</span>
            </div>
            {showCartSummary && (
              <div>
                <hr />
                <br />

                {cart.map((item, i) => {
                  return <CheckoutItem key={i} item={item} />;
                })}
                <table>
                  <tr>
                    <td>Subtotal</td>
                    <td>₦{totalProductPrice}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>₦{shippingPrice}</td>
                  </tr>
                  <DisaclaimerTag>
                    Please add reachable contact information.
                  </DisaclaimerTag>{" "}
                  <br />
                  <DisaclaimerTag>
                    Delivery Prices are subject to change, you will be contacted
                    prior to delivery to confirm the price.
                  </DisaclaimerTag>{" "}
                  <tr className="total">
                    <td>Total</td>
                    <td>₦{netPrice}</td>
                  </tr>
                </table>
              </div>
            )}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <h3>Contact</h3>
          <DoubleContainer>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}
            </div>
            <div>
              <label>Phone Number</label>
              <input
                placeholder="Phone number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone && errors.phone && (
                <ErrorText>{errors.phone}</ErrorText>
              )}
            </div>
          </DoubleContainer>
          <div>
            <h3>Delivery</h3>

            <DoubleContainer>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.firstName && errors.firstName && (
                  <ErrorText>{errors.firstName}</ErrorText>
                )}
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.lastName && errors.lastName && (
                  <ErrorText>{errors.lastName}</ErrorText>
                )}
              </div>
            </DoubleContainer>
            <div>
              <label>Address</label>
              <input
                type="Address"
                name="address"
                placeholder="Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.address && errors.address && (
                <ErrorText>{errors.address}</ErrorText>
              )}
            </div>
            <div>
              <label>Landmark</label>
              <input
                placeholder="A popular spot around you"
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.landmark && errors.landmark && (
                <ErrorText>{errors.landmark}</ErrorText>
              )}
            </div>
            <LocationContainer>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.city && errors.city && (
                  <ErrorText>{errors.city}</ErrorText>
                )}
              </div>

              <TextField
                select
                label="State"
                name="state"
                sx={{ width: "100%" }}
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {statesInNigeria.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </LocationContainer>
          </div>
          <MainBtn type="submit" disabled={isLoading}>
            {orderIsLoading
              ? "Placing order..."
              : verificationLoading
              ? "Verifying payment..."
              : isLoading
              ? "Loading..."
              : "Pay Now"}
          </MainBtn>
        </Form>
      </div>
      {!mobileview && (
        <ProductContainer>
          {cart.map((item, i) => {
            return <CheckoutItem key={i} item={item} />;
          })}
          <table>
            <tr>
              <td>Subtotal</td>
              <td>₦{totalProductPrice}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>₦{shippingPrice}</td>
            </tr>
            <DisaclaimerTag>
              Delivery Prices are subject to change, you will be contacted prior
              to delivery to confirm the price.
            </DisaclaimerTag>
            <tr className="total">
              <td>Total</td>
              <td>₦{netPrice}</td>
            </tr>
          </table>
        </ProductContainer>
      )}
    </Style>
  );
};

export default Checkout;

const Style = styled.div`
  display: ${(props) => !props.mobileview && "grid"};
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: ${(props) => props.mobileview && "145px"};
  form {
    label {
      font-size: 14px;
    }
  }
  table {
    width: 100%;
    margin-top: 20px;

    tr {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    tr.total {
      margin-top: 20px;
      padding-top: 10px;
      font-size: 20px;
      font-weight: 600;
    }
    @media (max-width: 800px) {
      table: {
        margin: 0;
      }
    }
  }

  label {
    font-size: 20px;
  }
  button {
    width: 100%;
  }
  form {
    padding: 15px;
    div {
      margin: 10px 0;
    }
  }

  /* padding: 0 30px; */
  div.order-summary {
    background-color: rgb(245, 245, 245);
    padding: 10px;

    .control {
      display: flex;
      align-items: center;

      span {
        color: #a55fa5;
        font-size: 15px;
        cursor: pointer;
        svg {
          margin-left: 10px;
          transform: scale(0.7) translateY(2px);
        }
      }
      span.total {
        margin-left: auto;
        cursor: auto;
        font-size: 20px;
        font-weight: 600;
        color: black;
      }
    }
  }
`;

const DoubleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LocationContainer = styled.div`
  /* display: flex; */
`;

const ProductContainer = styled.div`
  background-color: rgb(245, 245, 245);
  padding: 30px;
`;

const DisaclaimerTag = styled.small`
  color: #a55fa5;
`;
