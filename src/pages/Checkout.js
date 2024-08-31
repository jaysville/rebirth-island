import styled from "styled-components";
import Form from "../components/ui/Form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { regions, statesInNigeria } from "../data";
import { MainBtn } from "../components/ui/Buttons";
import { useSelector } from "react-redux";
import CheckoutItem from "../components/ui/CheckoutItem";
import { Menu } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";

const Checkout = ({ mobileview }) => {
  const cart = useSelector((state) => state.app.cart);
  const totalPrice = cart
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  const [showCartSummary, setShowCartSummary] = useState(false);

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
              <span className="total">${totalPrice}</span>
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
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>FREE</td>
                  </tr>
                  <tr className="total">
                    <td>Total</td>
                    <td>${totalPrice}</td>
                  </tr>
                </table>
              </div>
            )}
          </div>
        )}
        <Form>
          <div>
            <label>Contact</label>
            <input type="text" placeholder="Email or mobile phone number" />
          </div>
          <div>
            <label>Delivery</label>
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Country/Region"
                defaultValue="Nigeria"
                sx={{ width: "100%" }}
              >
                {regions.map((option) => (
                  <MenuItem key={option} value={option} sx={{ height: 40 }}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <NameContainer>
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
            </NameContainer>
            <div>
              <input type="Address" placeholder="Address" />
            </div>
            <LocationContainer>
              <input type="text" placeholder="City" />
              <TextField
                select
                label="State"
                defaultValue="Lagos"
                sx={{ width: "100%" }}
              >
                {statesInNigeria.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </LocationContainer>
          </div>
          <MainBtn>Pay Now</MainBtn>
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
              <td>${totalPrice}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Calculated at checkout</td>
            </tr>
            <tr className="total">
              <td>Total</td>
              <td>${totalPrice}</td>
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

const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const LocationContainer = styled.div`
  /* display: flex; */
`;

const ProductContainer = styled.div`
  background-color: rgb(245, 245, 245);
  padding: 30px;
`;
