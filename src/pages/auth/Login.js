import styled from "styled-components";
import Form from "../../components/ui/Form";
import { AltBtn, MainBtn } from "../../components/ui/Buttons";

const Login = () => {
  return (
    <Style>
      <h3>Login</h3>
      <Form>
        <div>
          <label>Email</label>
          <input></input>
        </div>

        <div>
          <label>Password</label>
          <input></input>
        </div>

        <MainBtn type="submit">Login</MainBtn>
        <hr />
        <a href="/register">
          <AltBtn type="button" onCl>
            Create Account
          </AltBtn>
        </a>
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
