import styled from "styled-components";
const Product = ({ product }) => {
  return (
    <Style>
      <a href={`/merch/${product._id}`}>
        <img alt="product" src={product.images[0]} />
        <span className="product-name">
          <b>{product.name}</b>
        </span>
        <span className="product-price">
          <del>₦{product.price}</del>{" "}
        </span>
        <span className="discount">₦{product.discountPrice}</span>
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
  b {
    font-weight: 500;
  }
  span {
    font-size: 13px;
  }
  span.product-name {
    display: block;
  }

  span.product-price {
    color: grey;
    display: inline;
  }
  .discount {
    color: #d72e4b;
  }
  img {
    width: 150px;
    height: 150px;
  }
`;
