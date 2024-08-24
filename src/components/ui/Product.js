import styled from "styled-components";
import { useState } from "react";
import { MainBtn } from "./Buttons";
import { useNavigate } from "react-router-dom";
const Product = ({ product, mobileview }) => {
  //   const [hovered, setHovered] = useState(false);
  //   const navigate = useNavigate();

  return (
    <Style
    //   onMouseEnter={() => {
    //     setHovered(true);
    //   }}
    //   onMouseLeave={() => {
    //     setHovered(false);
    //   }}
    //   onClick={() => {
    //     navigate(`/product/${product.id}`);
    //   }}
    >
      <a href={`/product/${product.id}`}>
        <img alt="product" src={product.images[0]} />
        <span>{product.name}</span>
        <span>{product.price} USD</span>
      </a>

      {/* {hovered && !mobileview && <MainBtn>Quick Shop</MainBtn>} */}
    </Style>
  );
};

export default Product;

const Style = styled.div`
  text-align: center;
  position: relative;
  cursor: pointer;
  a {
    text-decoration: none;
    color: black;
  }
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
