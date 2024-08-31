import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PRODUCTS } from "../data";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AltBtn, MainBtn, QuantityControl } from "../components/ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearItem } from "../redux/store.js/slices/appSlice";
import AddedToCartModal from "../components/ui/addedToCartModal/AddedToCartModal";
import Modal from "@mui/material/Modal";

const Product = () => {
  const params = useParams();
  const { id } = params;

  const [showCornfirmationModal, setshowConformationModal] = useState(false);

  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((prod) => prod.id.toString() === id);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.app.cart);

  const inCart = cart.find((item) => item.id === product.id);

  const handleClose = () => setshowConformationModal(false);
  const handleClick = () => {
    if (!inCart) {
      dispatch(addToCart({ product, quantity, size }));
      setshowConformationModal(true);
      setTimeout(() => {
        handleClose();
      }, 850);
    } else {
      dispatch(clearItem(product.id));
    }
  };

  const navigate = useNavigate();
  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const incrementQty = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  const decrementQty = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((prevState) => prevState - 1);
  };

  useEffect(() => {
    if (product.sizes) {
      setSize(product.sizes[0]);
    } else {
      setSize("N/A");
    }
    setActiveImage(product.images[0]);
  }, [product.sizes]);

  return (
    <Style>
      <Modal
        open={showCornfirmationModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddedToCartModal />
      </Modal>

      <ImageContainer>
        <img src={activeImage} alt="product" />
        <div>
          {product.images.map((image, i) => {
            return (
              <SmallerImage
                src={image}
                key={i}
                active={image === activeImage}
                onClick={() => {
                  setActiveImage(image);
                }}
              />
            );
          })}
        </div>
      </ImageContainer>
      <DetailsContainer>
        <div>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
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
              <div onClick={decrementQty}>-</div>
              <span>{quantity}</span>
              <div onClick={incrementQty}>+</div>
            </QuantityControl>
          </div>
        </div>
        <br />
        <MainBtn onClick={handleClick} type="submit">
          {inCart ? "Remove from cart" : "Add to cart"}
        </MainBtn>
        <AltBtn>Buy it now</AltBtn>
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
    width: 250px;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      align-self: flex-start;
    }
  }
  div {
    img {
      width: 80px;
    }
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

const SmallerImage = styled.img`
  cursor: pointer;
  border: ${(props) => props.active && "3px solid purple"};
`;
