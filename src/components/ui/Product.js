import styled from "styled-components";
const Product = ({ product }) => {
  return (
    <Style>
      <a href={`/merch/${product._id}`}>
        <img alt="product" src={product.images[0]} />
        <span>{product.name}</span>
        <span>${product.price} </span>
      </a>
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
    height: 180px;
  }
`;
