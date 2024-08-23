import styled from "styled-components";
import { useState } from "react";
import { MainBtn } from "./Buttons";
const Product = ({ product, mobileview }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Style
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <img alt="product" src={product.image} />
      <span>{product.name}</span>
      <span>{product.price} USD</span>
      {hovered && !mobileview && <MainBtn>Quick Shop</MainBtn>}
    </Style>
  );
};

export default Product;

const Style = styled.div`
  text-align: center;
  position: relative;
  cursor: pointer;
  span {
    display: block;
    font-size: 14px;
  }
  button {
    transform: scale(0.8);
    position: absolute;
    top: 80px;
    left: 150px;
    cursor: pointer;
  }
  img {
    width: 180px;
  }
`;
