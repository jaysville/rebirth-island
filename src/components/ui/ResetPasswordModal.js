import { Modal, Box, Typography, Button } from "@mui/material";
import { AltBtn } from "./Buttons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { notification } from "antd";

const ResetPasswordModal = ({ isOpen, handleClose }) => {
  const [email, setEmail] = useState("");

  const [forgotPassword, { data, isLoading, isSuccess, isError }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      notification.success({
        message: data.message,
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (isError) {
      notification.error({
        message: "Something went wrong.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, isError, data]);

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const isValid = validateEmail(email);
    if (!isValid) {
      notification.error({
        message: "Enter valid email",
        duration: 5,
        placement: "bottomRight",
      });
      return;
    }

    forgotPassword({ email });
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          mx: "auto",
          mt: "10%",
        }}
      >
        <Form>
          <label>
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <AltBtn onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Processing..." : "Submit"}
            </AltBtn>
          </div>
        </Form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
const Form = styled.form`
  label,
  input {
    display: block;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
  }
  button {
    width: 100%;
  }
`;
