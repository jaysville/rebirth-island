import { useSelector } from "react-redux";
import styled from "styled-components";
import CartItem from "../components/ui/CartItem";
import { AltBtn } from "../components/ui/Buttons";

const Cart = ({ mobileview }) => {
  const cart = useSelector((state) => state.app.cart);

  const totalPrice = cart
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <CartStyle>
      <h3>Cart</h3>

      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, i) => {
              return (
                <li key={i}>
                  <CartItem item={item} mobileview={mobileview} />
                </li>
              );
            })}
          </ul>
          <CheckoutSection>
            {!mobileview && <div />}
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
                <AltBtn>Checkout</AltBtn>
              </div>
            </div>
          </CheckoutSection>
        </>
      ) : (
        <p>No item added yet.</p>
      )}
    </CartStyle>
  );
};

export const CartStyle = styled.div`
  padding: 30px;
  h3 {
    padding: 10px;
    text-align: center;
  }
  p {
    text-align: center;
    margin-bottom: 132px;
  }
`;

export const CheckoutSection = styled.div`
  transform: translateY(-10px);
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: repeat(2, 1fr);

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
    justify-content: end;
  }
  button {
    width: 120px;
  }

  @media (max-width: 800px) {
    display: block;

    button {
      width: 100%;
    }
  }
`;

export default Cart;
