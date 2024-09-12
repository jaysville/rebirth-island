import styled from "styled-components";
import Form from "../../components/ui/Form";
import { MainBtn } from "../../components/ui/Buttons";
import {
  useEditMerchMutation,
  useGetSingleMerchQuery,
} from "../../redux/api/merchApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notification, Spin } from "antd";

const EditMerch = ({ mobileview }) => {
  const params = useParams();
  const { id } = params;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState("");
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isSuccess,

    isError,
  } = useGetSingleMerchQuery(id);

  const [
    editMerch,
    {
      isLoading: editMerchIsLoading,
      isSuccess: editMerchIsSuccess,
      error: editMerchError,
      isError: editMerchIsError,
    },
  ] = useEditMerchMutation();

  useEffect(() => {
    if (editMerchIsError) {
      notification.error({
        message: editMerchError.data.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (editMerchIsSuccess) {
      notification.success({
        message: "Merch Updated",
        duration: 3,
        placement: "bottomRight",
      });
      navigate("/");
    }
  }, [editMerchIsError, editMerchIsSuccess, editMerchError]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Something went wrong!",
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (isSuccess) {
      setName(product.name);
      setPrice(product.price);
      setSizes(product.sizes);
    }
  }, [isSuccess, isError]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!name || !price || !sizes) {
      notification.error({
        message: "All fields must be properly filled",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    } else if (
      name === product.name &&
      price === product.price &&
      sizes === product.sizes &&
      !images
    ) {
      notification.error({
        message: "No changes made",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }

    editMerch({ name, sizes, price, images, id: product._id });
  };

  return (
    <Style mobileview={mobileview}>
      <h3>Edit Merch</h3>

      {isLoading ? (
        <Spin />
      ) : isSuccess ? (
        <Form onSubmit={handleSave}>
          <div>
            <label>Name</label>
            <input
              defaultValue={product.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              defaultValue={product.price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Sizes</label>
            <input
              defaultValue={product.sizes.join(" ")}
              onChange={(e) => setSizes(e.target.value)}
            />
          </div>
          <div>
            <label>Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                setImages(e.target.files);
              }}
            />
          </div>
          <MainBtn disabled={editMerchIsLoading} type="submit">
            {editMerchIsLoading ? "Loading" : "Save"}
          </MainBtn>
        </Form>
      ) : (
        <p>Something went wrong</p>
      )}
    </Style>
  );
};

export default EditMerch;
const Style = styled.div`
  padding: 30px;
  display: grid;
  place-items: center;
  form {
    width: ${(props) => (props.mobileview ? "100%" : "40%")};
  }
`;
