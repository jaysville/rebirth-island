import styled from "styled-components";
import Form from "../../components/ui/Form";
import { AltBtn, MainBtn } from "../../components/ui/Buttons";
import { useLoginMutation } from "../../redux/api/authApi";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import {
  refreshToken,
  updateAdmin,
  updateUser,
} from "../../redux/store.js/slices/appSlice";
import { ErrorText } from "./Register";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: () => {
        login({
          email: values.email,
          password: values.password,
        });
      },
    });

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.user));
      dispatch(updateAdmin(data.user.isAdmin));
      dispatch(refreshToken(data.token));
      notification.success({
        message: "Welcome back",
        duration: 2,
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
  }, [data, error, isSuccess, isError, isLoading, dispatch, navigate]);

  return (
    <Style>
      <h3>Login</h3>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.email && errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.password && errors.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
        </div>

        <MainBtn type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </MainBtn>
        <hr />

        <AltBtn
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Create Account
        </AltBtn>
      </Form>
    </Style>
  );
};

const Style = styled.div`
  margin: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-bottom: 150px;
  form {
    width: 400px;
    @media (max-width: 460px) {
      width: 100%;
    }
  }
  h3 {
    text-align: center;
  }

  div {
    margin-bottom: 20px;
  }
`;

export default Login;
