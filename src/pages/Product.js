import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PRODUCTS } from "../products";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  CheckoutBtn,
  MainBtn,
  QuantityControl,
} from "../components/ui/Buttons";

const Product = () => {
  const params = useParams();
  const { id } = params;

  const [size, setSize] = useState("");

  const product = PRODUCTS.find((prod) => prod.id.toString() === id);

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    if (product.sizes) {
      setSize(product.sizes[0]);
    }
  }, [product.sizes]);
  return (
    <Style>
      <ImageContainer>
        <img src={product.image} alt="product" />
      </ImageContainer>
      <DetailsContainer>
        <div>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          {product.sizes && (
            <SizeControl>
              <label>Size</label>
              <FormControl sx={{ width: 220, marginLeft: "50px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size}
                  onChange={handleChange}
                >
                  {product.sizes.map((size, i) => {
                    return (
                      <MenuItem value={size} key={i}>
                        {size}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </SizeControl>
          )}
          <div>
            <label>Quantity</label>
            <QuantityControl>
              <span>-</span>
              <input type="text" value={1} readOnly />
              <span>+</span>
            </QuantityControl>
          </div>
        </div>
        <br />
        <MainBtn>Add to cart</MainBtn>
        <CheckoutBtn>Buy it now</CheckoutBtn>
      </DetailsContainer>
    </Style>
  );
};

export default Product;

const Style = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 50px;
  @media (max-width: 840px) {
    gap: 0;
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 840px) {
    place-items: start center;
  }

  button {
    display: block;
    border-radius: 4px;
    margin: 10px auto;
    width: 100%;
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  img {
    width: 420px;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  @media (max-width: 840px) {
    display: flex;
    justify-content: center;
  }
`;

const DetailsContainer = styled.div`
  width: 100%;
`;

const SizeControl = styled.div`
  display: flex;
  label {
    align-self: center;
  }
`;
