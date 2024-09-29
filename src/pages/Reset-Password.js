import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useResetPasswordMutation } from "../redux/api/userApi";
import { useEffect, useState } from "react";
import { AltBtn } from "../components/ui/Buttons";
import { notification } from "antd";
import Form from "../components/ui/Form";

const ResetPassword = () => {
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = params;
  const navigate = useNavigate();

  const [ResetPassword, { data, isSuccess, isLoading, isError }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: data.message,
        duration: 3,
        placement: "bottomRight",
      });
      navigate("/login");
    }
    if (isError) {
      notification.error({
        message: "Something went wrong.",
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [isSuccess, data, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 5 || password.length > 12) {
      notification.error({
        message: "Password should contain 5-12 characters.",
        duration: 6,
        placement: "bottomRight",
      });
      return;
    }
    if (password !== confirmPassword) {
      notification.error({
        message: "Passwords do not match",
        duration: 3,
        placement: "bottomRight",
      });
      return;
    }

    ResetPassword({ token, password });
  };

  return (
    <Style>
      <Form>
        <div>
          <label>New Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <AltBtn disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Processing" : "Reset Your Password"}
        </AltBtn>
      </Form>
    </Style>
  );
};

export default ResetPassword;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 150px auto;
  form {
    width: 400px;
    @media (max-width: 460px) {
      width: 100%;
    }
  }
`;
