import styled from "styled-components";
import Form from "../../components/ui/Form";
import { MainBtn } from "../../components/ui/Buttons";
import { useEffect, useState } from "react";
import { useAddMerchMutation } from "../../redux/api/merchApi";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AddMerch = ({ mobileview }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState(null);
  const [sizes, setSizes] = useState("");

  const navigate = useNavigate();

  const [addMerch, { isLoading, isError, error, data, isSuccess }] =
    useAddMerchMutation();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Merch Created",
        duration: 3,
        placement: "bottomRight",
      });

      navigate("/");
    }
    if (isError) {
      notification.error({
        message: error.data.message,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, isError, error, data, navigate]);

  const handleUploadMerch = (e) => {
    e.preventDefault();
    if (!name || !category || !price || !images || !sizes) {
      notification.error({
        message: "All fields must be properly filled",
        duration: 3,
        placement: "bottomRight",
      });

      return;
    }

    addMerch({ name, category, price, sizes, images });
  };

  return (
    <Style mobileview={mobileview}>
      <Form onSubmit={handleUploadMerch}>
        <div>
          <label>Name</label>
          <input
            placeholder="Product name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Category</label>
          <input
            placeholder="Product Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            placeholder="Product Price"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <label>Sizes</label>
          <input
            placeholder="Enter product sizes seperated by a space e.g s m l xl xxl"
            onChange={(e) => {
              setSizes(e.target.value);
            }}
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
        <MainBtn type="submit">{isLoading ? "Loading" : "Upload"}</MainBtn>
      </Form>
    </Style>
  );
};

export default AddMerch;
const Style = styled.div`
  padding: 30px;
  display: grid;
  place-items: center;
  form {
    width: ${(props) => (props.mobileview ? "100%" : "40%")};
  }
`;
