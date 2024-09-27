import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AltBtn, MainBtn, QuantityControl } from "../components/ui/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearItem } from "../redux/store.js/slices/appSlice";
import AddedToCartModal from "../components/ui/addedToCartModal/AddedToCartModal";
import Modal from "@mui/material/Modal";
import { Modal as DeleteModal, notification } from "antd";
import {
  useDeleteMerchMutation,
  useGetSingleMerchQuery,
} from "../redux/api/merchApi";
import { Spin } from "antd";

const Product = () => {
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const [showCornfirmationModal, setshowConformationModal] = useState(false);

  const [size, setSize] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    data: product,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetSingleMerchQuery(id);

  const [
    deleteMerch,
    {
      isLoading: deleteLoading,
      isError: deleteIsError,
      isSuccess: deleteIsSuccess,
      error: deleteError,
    },
  ] = useDeleteMerchMutation();

  const handleOk = () => {
    setOpenDeleteModal(false);
    deleteMerch(product._id);
  };

  const handleCancel = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    if (isSuccess) {
      if (product.sizes) {
        setSize(product.sizes[0]);
      } else {
        setSize("N/A");
      }
      setActiveImage(product.images[0]);
    }
    if (isError) {
      navigate("/");
    }
  }, [isSuccess, isError, error, product?.sizes]);

  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.app.isAdmin);

  const handleClose = () => setshowConformationModal(false);

  useEffect(() => {
    if (deleteIsSuccess) {
      notification.success({
        message: "Merch deleted",
        duration: 3,
        placement: "bottomRight",
      });
      navigate("/");
    }
    if (deleteIsError) {
      notification.error({
        message: deleteError.data.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [deleteError, deleteIsError, deleteIsSuccess, navigate]);

  const handleClick = () => {
    dispatch(addToCart({ product, quantity, size }));
    setshowConformationModal(true);
    setTimeout(() => {
      handleClose();
    }, 850);
  };

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
      <DeleteModal
        title="Conform Delete"
        open={openDeleteModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure you want to delete merch?
      </DeleteModal>
      {isLoading ? (
        <Spin />
      ) : isSuccess ? (
        <>
          {" "}
          <ImageContainer>
            <img src={activeImage} alt="product" />
            <div className="small-image-container">
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
              <p>₦{product.price}</p>
              {product.sizes && !isAdmin && (
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
              {!isAdmin && (
                <div>
                  <label>Quantity</label>
                  <QuantityControl>
                    <div onClick={decrementQty}>-</div>
                    <span>{quantity}</span>
                    <div onClick={incrementQty}>+</div>
                  </QuantityControl>
                </div>
              )}
            </div>
            <br />
            <MainBtn
              onClick={
                !isAdmin
                  ? handleClick
                  : () => {
                      navigate(`/edit-merch/${product._id}`);
                    }
              }
              type="submit"
            >
              {isAdmin
                ? "Edit Merch"
                : // : inCart
                  // ? "Remove from cart"
                  "Add to cart"}
            </MainBtn>
            {isAdmin && (
              <AltBtn
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                {deleteLoading ? "Deleting.." : "Delete Merch"}
              </AltBtn>
            )}
          </DetailsContainer>
        </>
      ) : (
        <p>Couldnt fetch product</p>
      )}
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
    width: 350px;
    @media (max-width: 500px) {
      width: 100%;
    }
  }

  div.small-image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
    @media (max-width: 410px) {
      grid-template-columns: repeat(3, 1fr);
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
