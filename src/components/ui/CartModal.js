import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CartStyle } from "../../pages/Cart";
import CartItem from "./CartItem";
import { AltBtn, MainBtn } from "./Buttons";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isopen, closecartmodal }) => {
  const cart = useSelector((state) => state.app.cart);
  const navigate = useNavigate();

  const totalPrice = cart
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <Drawer open={isopen} onClose={closecartmodal} anchor="right">
      <Container>
        <CartStyle>
          <h3>Cart</h3>
          {cart.length > 0 ? (
            <>
              <ul>
                {cart.map((item, i) => {
                  return (
                    <li key={i}>
                      <CartItem item={item} mobileview={true} />
                    </li>
                  );
                })}
              </ul>
              <CheckoutSection>
                <div>
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

                  <div className="btn-container">
                    <MainBtn
                      onClick={() => {
                        navigate("/cart");
                        closecartmodal();
                      }}
                    >
                      View Cart
                    </MainBtn>
                    <AltBtn>Checkout</AltBtn>
                  </div>
                </div>
              </CheckoutSection>
            </>
          ) : (
            <p>"Cart is empty go shoppig nigga"</p>
          )}
        </CartStyle>
      </Container>
    </Drawer>
  );
};

export default CartModal;

const Container = styled.div`
  width: 370px;
  img {
    width: 85px;
  }
`;

const CheckoutSection = styled.div`
  transform: translateY(-10px);
  border-top: 1px solid rgba(0, 0, 0, 0.3);

  table {
    width: 100%;

    tr {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    tr.total {
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      margin-top: 20px;
      padding-top: 10px;
    }
    @media (max-width: 800px) {
      table: {
        margin: 0;
      }
    }
  }
  div.btn-container {
    display: flex;
    justify-content: space-between;
    button {
      border-radius: 0;
      width: 47%;
      cursor: pointer;
    }
  }
`;
