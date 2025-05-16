import styled from "styled-components";
import { QuantityControl } from "./Buttons";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearItem,
  clearCart,
} from "../../redux/store.js/slices/appSlice";

import { CloseOutlined } from "@ant-design/icons";

const CartItem = ({ item, mobileview }) => {
  const totalPrice = item.price * item.quantity;

  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ id: item._id, size: item.size }));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: item, quantity: 1, size: item.size }));
  };

  const handleClearItem = () => {
    dispatch(clearItem({ id: item._id, size: item.size }));
  };
  return (
    <Style mobileview={mobileview}>
      <Clear onClick={handleClearItem} />
      <ProductDetails>
        <img src={item.images[0]} alt="product" />
        <div>
          <span>{item.name}</span>
          <span>₦{item.price.toFixed(2)}</span>
          <span>Size: {item.size}</span>
        </div>
      </ProductDetails>
      <CartControl>
        <CartQuantityControl>
          <div onClick={handleRemoveFromCart}>-</div>
          <span>{item.quantity}</span>
          <div onClick={handleAddToCart}> +</div>
        </CartQuantityControl>
        <div>₦{totalPrice.toFixed(2)}</div>
      </CartControl>
    </Style>
  );
};

export default CartItem;

const Style = styled.div`
  position: relative;
  display: grid;
  padding-top: 30px;
  grid-template-columns: ${(props) =>
    props.mobileview ? "repeat(1,1fr)" : "repeat(2, 1fr)"};

  border-top: 1px solid rgba(0, 0, 0, 0.3);

  img {
    width: 150px;
    @media (max-width: 800px) {
      width: 85px;
    }
  }
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  div {
    display: flex;
    flex-direction: column;
    place-self: center start;
  }
  span {
    margin: 5px 0;
  }
`;
const CartControl = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center start;
  padding: 10px;
`;

const Clear = styled(CloseOutlined)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const CartQuantityControl = styled(QuantityControl)`
  margin: 0;
  transform: scale(0.9) translateX(-18px);
  padding: 5px;
  border: 1px solid black;
`;
